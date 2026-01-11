import crypto from 'crypto';

/**
 * Authentication utility functions
 * bcrypt və jsonwebtoken paketləri əlavə edilməlidir
 */

/**
 * Şifrəni hash-lə (bcrypt)
 * @param {string} password - Plain text şifrə
 * @returns {Promise<string>} Hash-lənmiş şifrə
 */
export async function hashPassword(password) {
  // bcrypt yüklənənə qədər müvəqqəti olaraq crypto istifadə edək
  // Production-da MÜTLƏQ bcrypt istifadə edilməlidir!
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Şifrəni yoxla
 * @param {string} password - Plain text şifrə
 * @param {string} storedHash - Database-dəki hash
 * @returns {Promise<boolean>} Uyğun olub-olmadığı
 */
export async function verifyPassword(password, storedHash) {
  // bcrypt yüklənənə qədər müvəqqəti olaraq crypto istifadə edək
  const [salt, originalHash] = storedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === originalHash;
}

/**
 * JWT token yarat
 * @param {object} payload - Token içərisindəki məlumat
 * @param {string} expiresIn - Token müddəti (default: 24h)
 * @returns {string} JWT token
 */
export function generateToken(payload, expiresIn = '24h') {
  // Müvəqqəti olaraq crypto ilə sadə token yaradırıq
  // Production-da jsonwebtoken istifadə edilməlidir!
  const tokenData = {
    ...payload,
    exp: Date.now() + (24 * 60 * 60 * 1000), // 24 saat
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
 * JWT token-ı verify et
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token və ya null
 */
export function verifyToken(token) {
  try {
    const [encodedData, signature] = token.split('.');
    
    // Signature yoxla
    const expectedSignature = crypto
      .createHmac('sha256', process.env.JWT_SECRET || 'proep-secret-key-2026')
      .update(encodedData)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    // Token-ı decode et
    const tokenData = JSON.parse(Buffer.from(encodedData, 'base64').toString());
    
    // Expiration yoxla
    if (tokenData.exp < Date.now()) {
      return null;
    }
    
    return tokenData;
  } catch (error) {
    return null;
  }
}

/**
 * Token-dan hash yarat (database üçün)
 */
export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * IP address əldə et
 */
export function getIpAddress(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress ||
         'unknown';
}

/**
 * User Agent əldə et
 */
export function getUserAgent(req) {
  return req.headers['user-agent'] || 'unknown';
}
