import pool from '../config/database.js';

/**
 * Frontend Users Model
 */
const usersModel = {
  /**
   * Bütün istifadəçiləri əldə et
   */
  async getAll(filters = {}) {
    let query = `
      SELECT id, username, full_name, email, phone_number, company, position, 
             status, created_at, updated_at, can_delete
      FROM admin_frontend_users 
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (filters.status) {
      query += ` AND status = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    if (filters.search) {
      query += ` AND (full_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR company ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC`;

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
   * ID-yə görə istifadəçi tap
   */
  async getById(id) {
    const query = `
      SELECT id, username, full_name, email, phone_number, company, position, 
             status, created_at, updated_at, can_delete
      FROM admin_frontend_users 
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Email-ə görə istifadəçi tap
   */
  async getByEmail(email) {
    const query = `
      SELECT id, username, full_name, email, phone_number, company, position, 
             status, created_at, updated_at, can_delete
      FROM admin_frontend_users 
      WHERE email = $1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  /**
   * Username-ə görə istifadəçi tap
   */
  async getByUsername(username) {
    const query = `
      SELECT id, username, full_name, email, phone_number, company, position, 
             status, created_at, updated_at, can_delete
      FROM admin_frontend_users 
      WHERE username = $1
    `;
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },

  /**
   * Yeni istifadəçi yarat
   */
  async create(data) {
    const query = `
      INSERT INTO admin_frontend_users 
      (username, password_hash, full_name, email, phone_number, company, position, status, notes, can_delete)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, username, full_name, email, phone_number, company, position, status, created_at, can_delete
    `;
    const result = await pool.query(query, [
      data.username,
      data.password_hash || null,
      data.full_name,
      data.email,
      data.phone_number || null,
      data.company || null,
      data.position || null,
      data.status || 'active',
      data.notes || null,
      data.can_delete !== undefined ? data.can_delete : true
    ]);
    return result.rows[0];
  },

  /**
   * İstifadəçini yenilə
   */
  async update(id, data) {
    const query = `
      UPDATE admin_frontend_users
      SET 
        username = COALESCE($1, username),
        password_hash = COALESCE(NULLIF($2, ''), password_hash),
        full_name = COALESCE($3, full_name),
        email = COALESCE($4, email),
        phone_number = COALESCE($5, phone_number),
        company = COALESCE($6, company),
        position = COALESCE($7, position),
        status = COALESCE($8, status),
        notes = COALESCE($9, notes),
        can_delete = COALESCE($10, can_delete),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING id, username, full_name, email, phone_number, company, position, status, created_at, can_delete
    `;
    const result = await pool.query(query, [
      data.username,
      data.password_hash,
      data.full_name,
      data.email,
      data.phone_number,
      data.company,
      data.position,
      data.status,
      data.notes,
      data.can_delete,
      id
    ]);
    return result.rows[0];
  },

  /**
   * İstifadəçini sil
   */
  async delete(id) {
    const query = `DELETE FROM admin_frontend_users WHERE id = $1`;
    await pool.query(query, [id]);
  },

  /**
   * Son aktivliyi yenilə
   */
  async updateActivity(id) {
    const query = `
      UPDATE admin_frontend_users
      SET last_activity = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    await pool.query(query, [id]);
  },

  /**
   * Statistika
   */
  async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'active') as active,
        COUNT(*) FILTER (WHERE status = 'inactive') as inactive,
        COUNT(*) FILTER (WHERE status = 'blocked') as blocked,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as new_this_month
      FROM admin_frontend_users
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }
};

export default usersModel;
