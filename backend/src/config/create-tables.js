import pg from 'pg';
import dotenv from 'dotenv';
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
 * Admin tables yaradır
 */
async function createAdminTables() {
  try {
    console.log('🔧 Admin tables yaradılır...\n');

    // Əvvəlcə admin_users və admin_sessions table-larını yoxla/yarat
    console.log('1️⃣  Admin users və sessions table-ları yoxlanılır...');
    const adminSchemaPath = path.join(__dirname, 'admin-schema.sql');
    const adminSchemaSQL = fs.readFileSync(adminSchemaPath, 'utf8');
    await pool.query(adminSchemaSQL);
    console.log('✅ Admin users və sessions table-ları hazırdır\n');

    // Sonra digər admin table-larını yarat
    console.log('2️⃣  Digər admin table-ları yaradılır...');
    const tablesPath = path.join(__dirname, 'admin-tables.sql');
    const tablesSQL = fs.readFileSync(tablesPath, 'utf8');
    
    // SQL-i birbaşa icra et
    try {
      await pool.query(tablesSQL);
    } catch (err) {
      // Əgər table artıq varsa, xəta vermə
      if (err.code === '42P07') { // Table already exists
        console.log(`   ⚠️  Bəzi table-lar artıq mövcuddur, davam edilir...`);
      } else {
        console.error(`   ❌ SQL xətası: ${err.message}`);
        throw err;
      }
    }
    
    console.log('✅ Admin tables uğurla yaradıldı\n');

    // Table statistikasını göstər
    const stats = await pool.query(`
      SELECT 
        schemaname,
        tablename,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
      FROM pg_tables
      WHERE tablename LIKE 'admin_%'
      ORDER BY tablename
    `);

    console.log('📊 Yaradılmış tablolar:\n');
    if (stats.rows.length === 0) {
      console.log('   ⚠️  Heç bir admin table tapılmadı!');
    } else {
      stats.rows.forEach(row => {
        console.log(`   ✓ ${row.tablename.padEnd(40)} (${row.size})`);
      });
    }

    console.log('\n🎉 Setup tamamlandı!');

  } catch (error) {
    console.error('❌ Xəta:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Script-i icra et
createAdminTables();
