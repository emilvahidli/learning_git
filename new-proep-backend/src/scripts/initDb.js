
import pool from '../config/database.js';

const createTables = async () => {
    try {
        console.log('🔌 Connecting to database...');

        // Create schema
        await pool.query(`CREATE SCHEMA IF NOT EXISTS admin;`);
        console.log('✅ Schema "admin" created/verified');

        // Create menus table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS admin.menus (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                url VARCHAR(255) NOT NULL,
                parent_id INTEGER REFERENCES admin.menus(id) ON DELETE CASCADE,
                menu_order INTEGER DEFAULT 0,
                is_visible BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Table "admin.menus" created/verified');

        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS admin.admin_frontend_users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password_hash TEXT,
                full_name VARCHAR(255),
                email VARCHAR(255),
                phone_number VARCHAR(50),
                company VARCHAR(255),
                position VARCHAR(255),
                status VARCHAR(50) DEFAULT 'active',
                notes TEXT,
                can_delete BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_activity TIMESTAMP
            );
        `);
        console.log('✅ Table "admin.admin_frontend_users" created/verified');

        console.log('🎉 Database initialization completed successfully!');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    } finally {
        await pool.end();
    }
};

createTables();
