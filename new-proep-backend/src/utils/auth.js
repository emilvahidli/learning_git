import crypto from 'crypto';
import bcrypt from 'bcryptjs';

/**
 * Authentication utility functions
 */

/**
 * Hash password (bcrypt)
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

/**
 * Verify password
 * @param {string} password - Plain text password
 * @param {string} storedHash - Database hash
 * @returns {Promise<boolean>} Valid or not
 */
export async function verifyPassword(password, storedHash) {
    return bcrypt.compare(password, storedHash);
}

/**
 * Generate JWT token
 * @param {object} payload - Token payload
 * @param {string} expiresIn - Token duration (default: 24h)
 * @returns {string} JWT token
 */
export function generateToken(payload, expiresIn = '24h') {
    // Using simple crypto based token for now to match old backend logic
    // In production, should use jsonwebtoken library properly if preferred, 
    // but sticking to old backend implementation for compatibility.
    const tokenData = {
        ...payload,
        exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        iat: Date.now()
    };

    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
    const signature = crypto
        .createHmac('sha256', process.env.JWT_SECRET || 'proep-secret-key-2026')
        .update(token)
        .digest('hex');

    return `${token}.${signature}`;
}

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token or null
 */
export function verifyToken(token) {
    try {
        const [encodedData, signature] = token.split('.');

        // Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.JWT_SECRET || 'proep-secret-key-2026')
            .update(encodedData)
            .digest('hex');

        if (signature !== expectedSignature) {
            return null;
        }

        // Decode token
        const tokenData = JSON.parse(Buffer.from(encodedData, 'base64').toString());

        // Check expiration
        if (tokenData.exp < Date.now()) {
            return null;
        }

        return tokenData;
    } catch (error) {
        return null;
    }
}

/**
 * Hash token (for database)
 */
export function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Get IP address
 */
export function getIpAddress(req) {
    return req.headers['x-forwarded-for']?.split(',')[0] ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        'unknown';
}

/**
 * Get User Agent
 */
export function getUserAgent(req) {
    return req.headers['user-agent'] || 'unknown';
}
