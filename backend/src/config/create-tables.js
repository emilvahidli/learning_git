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

    // Tables faylını oxu və icra et
    const tablesPath = path.join(__dirname, 'admin-tables.sql');
    const tablesSQL = fs.readFileSync(tablesPath, 'utf8');
    
    await pool.query(tablesSQL);
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
    stats.rows.forEach(row => {
      console.log(`   ✓ ${row.tablename.padEnd(40)} (${row.size})`);
    });

    console.log('\n🎉 Setup tamamlandı!');

  } catch (error) {
    console.error('❌ Xəta:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Script-i icra et
createAdminTables();
