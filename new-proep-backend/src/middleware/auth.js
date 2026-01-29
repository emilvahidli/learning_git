import { verifyToken, hashToken } from '../utils/auth.js';
import adminModel from '../models/adminModel.js';

/**
 * Admin authentication middleware
 * Checks token and adds admin info to request
 */
export async function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify token
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        if (decoded.role === 'frontend_user') {
            req.admin = {
                id: decoded.id,
                username: decoded.username,
                role: decoded.role
            };
            return next();
        }

        // Hash token and check in database
        const tokenHash = hashToken(token);
        const session = await adminModel.findSessionByToken(tokenHash);

        if (!session) {
            return res.status(401).json({
                success: false,
                message: 'Session not found'
            });
        }

        // Add admin info
        req.admin = {
            id: session.admin_id,
            username: session.username,
            role: session.role
        };

        next();

    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
}
