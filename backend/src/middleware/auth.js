import { verifyToken, hashToken } from '../utils/auth.js';
import adminModel from '../models/adminModel.js';

/**
 * Admin authentication middleware
 * Token-ı yoxlayır və admin məlumatlarını req-ə əlavə edir
 */
export async function requireAuth(req, res, next) {
  try {
    // Authorization header-dən token-ı al
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication tələb olunur'
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Token-ı verify et
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token etibarsızdır və ya müddəti bitib'
      });
    }

    // Token-ı hash-lə və database-də yoxla
    const tokenHash = hashToken(token);
    const session = await adminModel.findSessionByToken(tokenHash);
    
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Session tapılmadı'
      });
    }

    // Admin məlumatlarını əlavə et
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
      message: 'Authentication xətası'
    });
  }
}

/**
 * Role-based authorization middleware
 * @param {string[]} allowedRoles - İcazəli rollar
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Authentication tələb olunur'
      });
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: 'Bu əməliyyat üçün icazəniz yoxdur'
      });
    }

    next();
  };
}

/**
 * Optional auth middleware
 * Token varsa yoxlayır, yoxsa next()-ə keçir
 */
export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    
    if (decoded) {
      const tokenHash = hashToken(token);
      const session = await adminModel.findSessionByToken(tokenHash);
      
      if (session) {
        req.admin = {
          id: session.admin_id,
          username: session.username,
          role: session.role
        };
      }
    }

    next();

  } catch (error) {
    console.error('Optional auth error:', error);
    next();
  }
}
