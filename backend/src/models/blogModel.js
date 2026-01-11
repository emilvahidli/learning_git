import pool from '../config/database.js';

/**
 * Blog Model
 */
const blogModel = {
  /**
   * Bütün blog postları
   */
  async getAll(filters = {}) {
    let query = `
      SELECT b.*, a.username as author_name, a.full_name as author_full_name
      FROM admin_blog_posts b
      LEFT JOIN admin_users a ON b.author_id = a.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (filters.status) {
      query += ` AND b.status = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    if (filters.category) {
      query += ` AND b.category = $${paramIndex}`;
      params.push(filters.category);
      paramIndex++;
    }

    if (filters.language) {
      query += ` AND b.language = $${paramIndex}`;
      params.push(filters.language);
      paramIndex++;
    }

    if (filters.search) {
      query += ` AND (b.title ILIKE $${paramIndex} OR b.content ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    query += ` ORDER BY b.created_at DESC`;

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
   * ID-yə görə post tap
   */
  async getById(id) {
    const query = `
      SELECT b.*, a.username as author_name, a.full_name as author_full_name
      FROM admin_blog_posts b
      LEFT JOIN admin_users a ON b.author_id = a.id
      WHERE b.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * post_id-yə görə post tap
   */
  async getByPostId(postId) {
    const query = `
      SELECT b.*, a.username as author_name, a.full_name as author_full_name
      FROM admin_blog_posts b
      LEFT JOIN admin_users a ON b.author_id = a.id
      WHERE b.post_id = $1
    `;
    const result = await pool.query(query, [postId]);
    return result.rows[0];
  },

  /**
   * Slug-a görə post tap
   */
  async getBySlug(slug) {
    const query = `SELECT * FROM admin_blog_posts WHERE slug = $1`;
    const result = await pool.query(query, [slug]);
    return result.rows[0];
  },

  /**
   * Yeni post yarat
   */
  async create(data, authorId) {
    const query = `
      INSERT INTO admin_blog_posts 
      (title, slug, short_description, content, cover_image, author_id, 
       category, tags, status, language, seo_title, seo_description, seo_keywords)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    const result = await pool.query(query, [
      data.title,
      data.slug,
      data.short_description || null,
      data.content,
      data.cover_image || null,
      authorId,
      data.category || null,
      data.tags || [],
      data.status || 'draft',
      data.language || 'az',
      data.seo_title || null,
      data.seo_description || null,
      data.seo_keywords || null
    ]);
    return result.rows[0];
  },

  /**
   * Post-u yenilə
   */
  async update(id, data) {
    const query = `
      UPDATE admin_blog_posts
      SET 
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        short_description = COALESCE($3, short_description),
        content = COALESCE($4, content),
        cover_image = COALESCE($5, cover_image),
        category = COALESCE($6, category),
        tags = COALESCE($7, tags),
        status = COALESCE($8, status),
        language = COALESCE($9, language),
        seo_title = COALESCE($10, seo_title),
        seo_description = COALESCE($11, seo_description),
        seo_keywords = COALESCE($12, seo_keywords),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $13
      RETURNING *
    `;
    const result = await pool.query(query, [
      data.title,
      data.slug,
      data.short_description,
      data.content,
      data.cover_image,
      data.category,
      data.tags,
      data.status,
      data.language,
      data.seo_title,
      data.seo_description,
      data.seo_keywords,
      id
    ]);
    return result.rows[0];
  },

  /**
   * Post-u publish et
   */
  async publish(id) {
    const query = `
      UPDATE admin_blog_posts
      SET status = 'published', published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Post-u sil
   */
  async delete(id) {
    const query = `DELETE FROM admin_blog_posts WHERE id = $1`;
    await pool.query(query, [id]);
  },

  /**
   * View sayını artır
   */
  async incrementViews(id) {
    const query = `
      UPDATE admin_blog_posts
      SET views = views + 1
      WHERE id = $1
    `;
    await pool.query(query, [id]);
  },

  /**
   * Kateqoriyalar
   */
  async getCategories() {
    const query = `SELECT * FROM admin_blog_categories WHERE status = 'active' ORDER BY name_az`;
    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Statistika
   */
  async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'published') as published,
        COUNT(*) FILTER (WHERE status = 'draft') as draft,
        SUM(views) as total_views,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as new_this_month
      FROM admin_blog_posts
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }
};

export default blogModel;
