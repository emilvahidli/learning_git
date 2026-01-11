import pool from '../config/database.js';

/**
 * Users table-ə username və password əlavə et
 */
async function updateUsersTable() {
  try {
    console.log('👥 Users table yenilənir...\n');

    // Username və password_hash sütunları əlavə et
    await pool.query(`
      ALTER TABLE admin_frontend_users 
      ADD COLUMN IF NOT EXISTS username VARCHAR(50) UNIQUE;
    `);

    await pool.query(`
      ALTER TABLE admin_frontend_users 
      ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
    `);

    await pool.query(`
      ALTER TABLE admin_frontend_users 
      ADD COLUMN IF NOT EXISTS can_delete BOOLEAN DEFAULT TRUE;
    `);

    // Email-dən username yarat (mövcud istifadəçilər üçün)
    await pool.query(`
      UPDATE admin_frontend_users 
      SET username = SPLIT_PART(email, '@', 1)
      WHERE username IS NULL OR username = '';
    `);

    console.log('✅ Users table uğurla yeniləndi\n');

    const result = await pool.query(`
      SELECT id, username, email, status, can_delete 
      FROM admin_frontend_users 
      LIMIT 5
    `);

    console.log('📊 Nümunə istifadəçilər:');
    result.rows.forEach(row => {
      console.log(`   ${row.username || 'N/A'} (${row.email}) - ${row.status} - can_delete: ${row.can_delete}`);
    });

  } catch (error) {
    console.error('❌ Xəta:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

updateUsersTable();
