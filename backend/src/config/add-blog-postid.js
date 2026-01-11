import pool from '../config/database.js';

/**
 * Add post_id to blog posts
 */
async function addBlogPostId() {
  try {
    console.log('📝 Blog post_id əlavə edilir...\n');

    // Create sequence
    await pool.query(`
      CREATE SEQUENCE IF NOT EXISTS blog_post_id_seq START 100000;
    `);

    // Add column
    await pool.query(`
      ALTER TABLE admin_blog_posts 
      ADD COLUMN IF NOT EXISTS post_id VARCHAR(6) UNIQUE 
      DEFAULT LPAD(CAST(NEXTVAL('blog_post_id_seq') AS TEXT), 6, '0');
    `);

    // Update existing posts
    await pool.query(`
      UPDATE admin_blog_posts 
      SET post_id = LPAD(CAST(id + 100000 AS TEXT), 6, '0') 
      WHERE post_id IS NULL OR post_id = '';
    `);

    console.log('✅ Blog post_id uğurla əlavə edildi\n');

    const result = await pool.query(`
      SELECT id, post_id, title FROM admin_blog_posts LIMIT 5
    `);

    console.log('📊 Nümunə postlar:');
    result.rows.forEach(row => {
      console.log(`   ${row.post_id} - ${row.title}`);
    });

  } catch (error) {
    console.error('❌ Xəta:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addBlogPostId();
