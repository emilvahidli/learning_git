import pool from '../config/database.js';

/**
 * Messages (Contact Form) Model
 */
const messagesModel = {
  /**
   * Bütün mesajları əldə et
   */
  async getAll(filters = {}) {
    let query = `
      SELECT m.*, a.username as replied_by_username
      FROM admin_messages m
      LEFT JOIN admin_users a ON m.replied_by = a.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (filters.status) {
      query += ` AND m.status = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    if (filters.search) {
      query += ` AND (m.name ILIKE $${paramIndex} OR m.email ILIKE $${paramIndex} OR m.message ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    query += ` ORDER BY m.created_at DESC`;

    if (filters.limit) {
      query += ` LIMIT $${paramIndex}`;
      params.push(filters.limit);
      paramIndex++;
    }

    if (filters.offset) {
      query += ` OFFSET $${paramIndex}`;
      params.push(filters.offset);
    }

    const result = await pool.query(query, params);
    return result.rows;
  },

  /**
   * ID-yə görə mesaj tap
   */
  async getById(id) {
    const query = `
      SELECT m.*, a.username as replied_by_username
      FROM admin_messages m
      LEFT JOIN admin_users a ON m.replied_by = a.id
      WHERE m.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Yeni mesaj yarat
   */
  async create(data) {
    const query = `
      INSERT INTO admin_messages 
      (name, email, phone_number, appeal_type, subject, message, ip_address, user_agent, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const result = await pool.query(query, [
      data.name,
      data.email,
      data.phone_number || null,
      data.appeal_type || null,
      data.subject || null,
      data.message,
      data.ip_address || null,
      data.user_agent || null,
      data.status || 'unread'
    ]);
    return result.rows[0];
  },

  /**
   * Mesajı read olaraq işarələ
   */
  async markAsRead(id) {
    const query = `
      UPDATE admin_messages
      SET status = 'read', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Mesaja cavab yaz
   */
  async reply(id, replyMessage, adminId) {
    const query = `
      UPDATE admin_messages
      SET 
        status = 'replied',
        reply_message = $1,
        replied_by = $2,
        replied_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await pool.query(query, [replyMessage, adminId, id]);
    return result.rows[0];
  },

  /**
   * Mesajı arxivlə
   */
  async archive(id) {
    const query = `
      UPDATE admin_messages
      SET status = 'archived', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Mesajı sil
   */
  async delete(id) {
    const query = `DELETE FROM admin_messages WHERE id = $1`;
    await pool.query(query, [id]);
  },

  /**
   * Statistika
   */
  async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'unread') as unread,
        COUNT(*) FILTER (WHERE status = 'read') as read,
        COUNT(*) FILTER (WHERE status = 'replied') as replied,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_week
      FROM admin_messages
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }
};

export default messagesModel;
