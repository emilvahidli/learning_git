import pool from '../config/database.js';

/**
 * Admin User Models
 */
const adminModel = {
  /**
   * Find admin by username
   */
  async findByUsername(username) {
    const query = `
      SELECT id, username, password_hash, full_name, email, role, is_active, last_login, created_at
      FROM admin.admin_users
      WHERE username = $1 AND is_active = TRUE
    `;
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },

  /**
   * Find admin by ID
   */
  async findById(id) {
    const query = `
      SELECT id, username, full_name, email, role, is_active, last_login, created_at
      FROM admin.admin_users
      WHERE id = $1 AND is_active = TRUE
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Create new admin
   */
  async create(username, passwordHash, fullName, email, role = 'admin') {
    const query = `
      INSERT INTO admin.admin_users (username, password_hash, full_name, email, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, full_name, email, role, created_at
    `;
    const result = await pool.query(query, [username, passwordHash, fullName, email, role]);
    return result.rows[0];
  },

  /**
   * Update last login
   */
  async updateLastLogin(id) {
    const query = `
      UPDATE admin.admin_users
      SET last_login = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    await pool.query(query, [id]);
  },

  /**
   * Create admin session
   */
  async createSession(adminId, tokenHash, ipAddress, userAgent, expiresAt) {
    const query = `
      INSERT INTO admin.admin_sessions (admin_id, token_hash, ip_address, user_agent, expires_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at
    `;
    const result = await pool.query(query, [adminId, tokenHash, ipAddress, userAgent, expiresAt]);
    return result.rows[0];
  },

  /**
   * Find session by token
   */
  async findSessionByToken(tokenHash) {
    const query = `
      SELECT s.id, s.admin_id, s.expires_at, a.username, a.role, a.is_active
      FROM admin.admin_sessions s
      JOIN admin.admin_users a ON s.admin_id = a.id
      WHERE s.token_hash = $1 AND s.expires_at > CURRENT_TIMESTAMP AND a.is_active = TRUE
    `;
    const result = await pool.query(query, [tokenHash]);
    return result.rows[0];
  },

  /**
   * Clean expired sessions
   */
  async cleanExpiredSessions() {
    const query = `DELETE FROM admin.admin_sessions WHERE expires_at < CURRENT_TIMESTAMP`;
    await pool.query(query);
  },

  /**
   * Delete admin session (logout)
   */
  async deleteSession(tokenHash) {
    const query = `DELETE FROM admin.admin_sessions WHERE token_hash = $1`;
    await pool.query(query, [tokenHash]);
  },

  /**
   * Get all admins
   */
  async getAllAdmins() {
    const query = `
      SELECT id, username, full_name, email, role, is_active, last_login, created_at
      FROM admin.admin_users
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Update password
   */
  async updatePassword(id, passwordHash) {
    const query = `
      UPDATE admin.admin_users
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `;
    await pool.query(query, [passwordHash, id]);
  },

  /**
   * Find frontend user by username (for login)
   */
  async findFrontendUserByUsername(username) {
    const query = `
      SELECT id, username, password_hash, full_name, email, status
      FROM admin.admin_frontend_users
      WHERE username = $1
    `;
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },

  /**
   * Update frontend user activity
   */
  async updateFrontendUserActivity(id) {
    const query = `
      UPDATE admin.admin_frontend_users
      SET last_activity = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    await pool.query(query, [id]);
  }
};

export default adminModel;
