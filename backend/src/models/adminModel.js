import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

/**
 * Admin istifadəçi modelləri
 */
const adminModel = {
  /**
   * Username-ə görə admin tap
   */
  async findByUsername(username) {
    const query = `
      SELECT id, username, password_hash, full_name, email, role, is_active, last_login, created_at
      FROM admin_users
      WHERE username = $1 AND is_active = TRUE
    `;
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },

  /**
   * ID-yə görə admin tap
   */
  async findById(id) {
    const query = `
      SELECT id, username, full_name, email, role, is_active, last_login, created_at
      FROM admin_users
      WHERE id = $1 AND is_active = TRUE
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Yeni admin yarat
   */
  async create(username, passwordHash, fullName, email, role = 'admin') {
    const query = `
      INSERT INTO admin_users (username, password_hash, full_name, email, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, full_name, email, role, created_at
    `;
    const result = await pool.query(query, [username, passwordHash, fullName, email, role]);
    return result.rows[0];
  },

  /**
   * Son login tarixini yenilə
   */
  async updateLastLogin(id) {
    const query = `
      UPDATE admin_users
      SET last_login = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    await pool.query(query, [id]);
  },

  /**
   * Admin session yarat
   */
  async createSession(adminId, tokenHash, ipAddress, userAgent, expiresAt) {
    const query = `
      INSERT INTO admin_sessions (admin_id, token_hash, ip_address, user_agent, expires_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at
    `;
    const result = await pool.query(query, [adminId, tokenHash, ipAddress, userAgent, expiresAt]);
    return result.rows[0];
  },

  /**
   * Token-a görə session tap
   */
  async findSessionByToken(tokenHash) {
    const query = `
      SELECT s.id, s.admin_id, s.expires_at, a.username, a.role, a.is_active
      FROM admin_sessions s
      JOIN admin_users a ON s.admin_id = a.id
      WHERE s.token_hash = $1 AND s.expires_at > CURRENT_TIMESTAMP AND a.is_active = TRUE
    `;
    const result = await pool.query(query, [tokenHash]);
    return result.rows[0];
  },

  /**
   * Köhnə sessionları təmizlə
   */
  async cleanExpiredSessions() {
    const query = `DELETE FROM admin_sessions WHERE expires_at < CURRENT_TIMESTAMP`;
    await pool.query(query);
  },

  /**
   * Admin sessionunu sil (logout)
   */
  async deleteSession(tokenHash) {
    const query = `DELETE FROM admin_sessions WHERE token_hash = $1`;
    await pool.query(query, [tokenHash]);
  },

  /**
   * Bütün admin sessionları
   */
  async getAllAdmins() {
    const query = `
      SELECT id, username, full_name, email, role, is_active, last_login, created_at
      FROM admin_users
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Şifrəni yenilə
   */
  async updatePassword(id, passwordHash) {
    const query = `
      UPDATE admin_users
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `;
    await pool.query(query, [passwordHash, id]);
  }
};

export default adminModel;
