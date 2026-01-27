import pool from './database.js';

async function migrate() {
    const client = await pool.connect();

    try {
        console.log('🔄 Running migrations...');

        // Create link_clicks table if not exists
        await client.query(`
      CREATE TABLE IF NOT EXISTS admin.link_clicks (
        id SERIAL PRIMARY KEY,
        url TEXT UNIQUE NOT NULL,
        count INTEGER DEFAULT 1,
        last_clicked TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
        console.log('✅ link_clicks table ready');

        // Create index for faster queries
        await client.query(`
      CREATE INDEX IF NOT EXISTS idx_link_clicks_count 
      ON admin.link_clicks(count DESC);
    `);
        console.log('✅ Indexes created');

        console.log('✅ All migrations completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        client.release();
        process.exit(0);
    }
}

migrate();
