import pool from '../config/database.js';

/**
 * Portfolio Model
 */
const portfolioModel = {
  /**
   * Bütün portfolio layihələri
   */
  async getAll(filters = {}) {
    let query = `
      SELECT p.*, a.username as creator_name, a.full_name as creator_full_name
      FROM admin_portfolio_projects p
      LEFT JOIN admin_users a ON p.created_by = a.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (filters.status) {
      query += ` AND p.status = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    if (filters.featured !== undefined) {
      query += ` AND p.is_featured = $${paramIndex}`;
      params.push(filters.featured);
      paramIndex++;
    }

    if (filters.search) {
      query += ` AND (p.title_az ILIKE $${paramIndex} OR p.title_en ILIKE $${paramIndex} OR p.client_name ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    query += ` ORDER BY p.display_order ASC, p.created_at DESC`;

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
   * ID-yə görə layihə tap
   */
  async getById(id) {
    const query = `
      SELECT p.*, a.username as creator_name, a.full_name as creator_full_name
      FROM admin_portfolio_projects p
      LEFT JOIN admin_users a ON p.created_by = a.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Slug-a görə layihə tap
   */
  async getBySlug(slug) {
    const query = `SELECT * FROM admin_portfolio_projects WHERE slug = $1`;
    const result = await pool.query(query, [slug]);
    return result.rows[0];
  },

  /**
   * Yeni layihə yarat
   */
  async create(data, creatorId) {
    const query = `
      INSERT INTO admin_portfolio_projects 
      (title_az, title_en, slug, short_description_az, short_description_en,
       detailed_description_az, detailed_description_en, client_name, project_url,
       completion_date, project_duration, cover_image, gallery_images, technologies,
       features_az, features_en, status, is_featured, display_order, seo_title_az,
       seo_title_en, seo_description_az, seo_description_en, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      RETURNING *
    `;
    const result = await pool.query(query, [
      data.title_az,
      data.title_en,
      data.slug,
      data.short_description_az,
      data.short_description_en,
      data.detailed_description_az || null,
      data.detailed_description_en || null,
      data.client_name || null,
      data.project_url || null,
      data.completion_date || null,
      data.project_duration || null,
      data.cover_image || null,
      data.gallery_images || [],
      data.technologies || [],
      data.features_az || [],
      data.features_en || [],
      data.status || 'draft',
      data.is_featured || false,
      data.display_order || 0,
      data.seo_title_az || null,
      data.seo_title_en || null,
      data.seo_description_az || null,
      data.seo_description_en || null,
      creatorId
    ]);
    return result.rows[0];
  },

  /**
   * Layihəni yenilə
   */
  async update(id, data) {
    const query = `
      UPDATE admin_portfolio_projects
      SET 
        title_az = COALESCE($1, title_az),
        title_en = COALESCE($2, title_en),
        slug = COALESCE($3, slug),
        short_description_az = COALESCE($4, short_description_az),
        short_description_en = COALESCE($5, short_description_en),
        detailed_description_az = COALESCE($6, detailed_description_az),
        detailed_description_en = COALESCE($7, detailed_description_en),
        client_name = COALESCE($8, client_name),
        project_url = COALESCE($9, project_url),
        completion_date = COALESCE($10, completion_date),
        project_duration = COALESCE($11, project_duration),
        cover_image = COALESCE($12, cover_image),
        gallery_images = COALESCE($13, gallery_images),
        technologies = COALESCE($14, technologies),
        features_az = COALESCE($15, features_az),
        features_en = COALESCE($16, features_en),
        status = COALESCE($17, status),
        is_featured = COALESCE($18, is_featured),
        display_order = COALESCE($19, display_order),
        seo_title_az = COALESCE($20, seo_title_az),
        seo_title_en = COALESCE($21, seo_title_en),
        seo_description_az = COALESCE($22, seo_description_az),
        seo_description_en = COALESCE($23, seo_description_en),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $24
      RETURNING *
    `;
    const result = await pool.query(query, [
      data.title_az, data.title_en, data.slug, data.short_description_az,
      data.short_description_en, data.detailed_description_az, data.detailed_description_en,
      data.client_name, data.project_url, data.completion_date, data.project_duration,
      data.cover_image, data.gallery_images, data.technologies, data.features_az,
      data.features_en, data.status, data.is_featured, data.display_order,
      data.seo_title_az, data.seo_title_en, data.seo_description_az,
      data.seo_description_en, id
    ]);
    return result.rows[0];
  },

  /**
   * Layihəni publish et
   */
  async publish(id) {
    const query = `
      UPDATE admin_portfolio_projects
      SET status = 'published', published_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Layihəni sil
   */
  async delete(id) {
    const query = `DELETE FROM admin_portfolio_projects WHERE id = $1`;
    await pool.query(query, [id]);
  },

  /**
   * View sayını artır
   */
  async incrementViews(id) {
    const query = `
      UPDATE admin_portfolio_projects
      SET views = views + 1
      WHERE id = $1
    `;
    await pool.query(query, [id]);
  },

  /**
   * Kateqoriyalar
   */
  async getCategories() {
    const query = `SELECT * FROM admin_portfolio_categories WHERE status = 'active' ORDER BY name_az`;
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
        COUNT(*) FILTER (WHERE is_featured = true) as featured,
        SUM(views) as total_views
      FROM admin_portfolio_projects
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }
};

export default portfolioModel;
