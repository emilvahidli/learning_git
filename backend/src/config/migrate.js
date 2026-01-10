import pool from './database.js';

const createTables = async () => {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Starting database migration...');

    // Create admin schema
    await client.query(`
      CREATE SCHEMA IF NOT EXISTS admin;
    `);
    console.log('✅ Schema "admin" created');

    // Create appeal table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin.appeal (
        id SERIAL PRIMARY KEY,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        mail VARCHAR(255) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        appeal INTEGER NOT NULL CHECK (appeal IN (1, 2, 3, 4, 5)),
        name VARCHAR(30) NOT NULL CHECK (LENGTH(name) <= 30),
        message TEXT NOT NULL CHECK (LENGTH(message) <= 2000)
      );
    `);
    console.log('✅ Table "admin.appeal" created');

    // Create index on created_date for better query performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_appeal_created_date 
      ON admin.appeal(created_date DESC);
    `);
    console.log('✅ Index on created_date created');

    // Create index on mail for better query performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_appeal_mail 
      ON admin.appeal(mail);
    `);
    console.log('✅ Index on mail created');

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Run migration
createTables()
  .then(() => {
    console.log('✅ Database setup complete!');
    pool.end();
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database setup failed:', error);
    pool.end();
    process.exit(1);
  });
