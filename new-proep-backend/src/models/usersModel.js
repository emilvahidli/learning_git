import pool from '../config/database.js';

/**
 * Frontend Users Model
 */
const usersModel = {
    /**
     * Get all users
     */
    async getAll(filters = {}) {
        let query = `
      SELECT id, username, full_name, email, phone_number, company, position, 
             status, created_at, updated_at, can_delete
      FROM admin.admin_frontend_users 
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
     * Get by ID
     */
    async getById(id) {
        const query = `
      SELECT id, username, full_name, email, phone_number, company, position, 
             status, created_at, updated_at, can_delete
      FROM admin.admin_frontend_users 
      WHERE id = $1
    `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    /**
     * Get by Email
     */
    async getByEmail(email) {
        const query = `
      SELECT id, username, full_name, email, phone_number, company, position, 
             status, created_at, updated_at, can_delete
      FROM admin.admin_frontend_users 
      WHERE email = $1
    `;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    },

    /**
     * Get by Username
     */
    async getByUsername(username) {
        const query = `
      SELECT id, username, full_name, email, phone_number, company, position, 
             status, created_at, updated_at, can_delete
      FROM admin.admin_frontend_users 
      WHERE username = $1 AND status = 'active'
    `;
        const result = await pool.query(query, [username]);
        return result.rows[0];
    },

    /**
     * Create new user
     */
    async create(data) {
        const query = `
      INSERT INTO admin.admin_frontend_users 
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
     * Update user (generic)
     */
    async update(id, data) {
        // Build dynamic query
        const fields = [];
        const params = [id];
        let paramIndex = 2;

        if (data.username) { fields.push(`username = $${paramIndex++}`); params.push(data.username); }
        if (data.full_name) { fields.push(`full_name = $${paramIndex++}`); params.push(data.full_name); }
        if (data.email) { fields.push(`email = $${paramIndex++}`); params.push(data.email); }
        if (data.password_hash) { fields.push(`password_hash = $${paramIndex++}`); params.push(data.password_hash); }
        if (data.status) { fields.push(`status = $${paramIndex++}`); params.push(data.status); }
        // Add other fields as needed

        fields.push(`updated_at = CURRENT_TIMESTAMP`);

        if (fields.length === 1) return null; // Only updated_at, no data

        const query = `
            UPDATE admin.admin_frontend_users
            SET ${fields.join(', ')}
            WHERE id = $1
            RETURNING id, username, full_name, email, status, updated_at
        `;

        const result = await pool.query(query, params);
        return result.rows[0];
    },

    /**
     * Delete user
     */
    async delete(id) {
        const query = `DELETE FROM admin.admin_frontend_users WHERE id = $1 RETURNING id`;
        const result = await pool.query(query, [id]);
        return result.rowCount > 0;
    },

    /**
     * Update activity
     */
    async updateActivity(id) {
        const query = `
      UPDATE admin.admin_frontend_users
      SET last_activity = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
        await pool.query(query, [id]);
    }
};

export default usersModel;
