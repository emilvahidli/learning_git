import pg from 'pg';
import dotenv from 'dotenv';
import { hashPassword } from '../utils/auth.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
 * Admin schema və ilk admin user yaradır
 */
async function createAdminUser() {
  try {
    console.log('🔧 Admin schema yaradılır...');

    // Schema faylını oxu və icra et
    const schemaPath = path.join(__dirname, 'admin-schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    await pool.query(schemaSQL);
    console.log('✅ Admin schema uğurla yaradıldı');

    // İlk admin user yaradırıq
    console.log('\n👤 İlk admin user yaradılır...');
    
    const username = 'emil.vahidli';
    const password = 'Projson!';
    const fullName = 'Emil Vahidli';
    const email = 'info@proep.az';
    const role = 'super_admin';

    // Şifrəni hash-lə
    const passwordHash = await hashPassword(password);

    // User-in mövcudluğunu yoxla
    const checkQuery = 'SELECT id FROM admin_users WHERE username = $1';
    const existing = await pool.query(checkQuery, [username]);

    if (existing.rows.length > 0) {
      console.log('⚠️  Admin user artıq mövcuddur:', username);
      
      // Şifrəni yenilə
      const updateQuery = 'UPDATE admin_users SET password_hash = $1 WHERE username = $2';
      await pool.query(updateQuery, [passwordHash, username]);
      console.log('✅ Şifrə yeniləndi');
    } else {
      // Yeni admin yarat
      const insertQuery = `
        INSERT INTO admin_users (username, password_hash, full_name, email, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, full_name, email, role
      `;
      const result = await pool.query(insertQuery, [username, passwordHash, fullName, email, role]);
      
      console.log('✅ Admin user uğurla yaradıldı:');
      console.log('   ID:', result.rows[0].id);
      console.log('   Username:', result.rows[0].username);
      console.log('   Full Name:', result.rows[0].full_name);
      console.log('   Email:', result.rows[0].email);
      console.log('   Role:', result.rows[0].role);
    }

    console.log('\n🎉 Setup tamamlandı!');
    console.log('\n📋 Login məlumatları:');
    console.log('   Username: emil.vahidli');
    console.log('   Password: Projson!');
    console.log('\n🔐 Şifrəni mütləq dəyişdirin!');

  } catch (error) {
    console.error('❌ Xəta:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Script-i icra et
createAdminUser();
