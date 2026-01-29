import pool from './database.js';

async function migrateMenus() {
    const client = await pool.connect();

    try {
        console.log('🔄 Running menu migrations...');

        // Create admin.menus table
        await client.query(`
            CREATE TABLE IF NOT EXISTS admin.menus (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                url TEXT NOT NULL,
                parent_id INTEGER REFERENCES admin.menus(id) ON DELETE CASCADE,
                menu_order INTEGER DEFAULT 0,
                is_visible BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('✅ admin.menus table ready');

        // Create index for parent_id to speed up hierarchy queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_menus_parent_id 
            ON admin.menus(parent_id);
        `);

        // Create index for menu_order for sorting
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_menus_order 
            ON admin.menus(menu_order);
        `);
        console.log('✅ Menu indexes created');

        console.log('✅ Menu migration completed successfully!');
    } catch (error) {
        console.error('❌ Menu migration failed:', error);
        throw error;
    } finally {
        client.release();
        process.exit(0);
    }
}

migrateMenus();
