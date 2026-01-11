import blogModel from '../models/blogModel.js';

/**
 * Bütün blog postları
 */
export async function getAllPosts(req, res) {
  try {
    const { status, category, language, search, limit = 50, offset = 0 } = req.query;
    
    const posts = await blogModel.getAll({
      status,
      category,
      language,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const stats = await blogModel.getStats();

    return res.status(200).json({
      success: true,
      data: {
        posts,
        stats
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Bir post əldə et
 */
export async function getPost(req, res) {
  try {
    const { id } = req.params;
    
    // Check if id is post_id (6 digits) or regular id
    let post;
    if (/^\d{6}$/.test(id)) {
      post = await blogModel.getByPostId(id);
    } else {
      post = await blogModel.getById(id);
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Get post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Yeni post yarat
 */
export async function createPost(req, res) {
  try {
    const adminId = req.admin.id;
    const {
      title, slug, short_description, content, cover_image,
      category, tags, status, language, seo_title, seo_description, seo_keywords
    } = req.body;

    // Validation
    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        message: 'Başlıq, slug və məzmun tələb olunur'
      });
    }

    // Slug-ın mövcudluğunu yoxla
    const existing = await blogModel.getBySlug(slug);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Bu slug artıq mövcuddur'
      });
    }

    const post = await blogModel.create({
      title, slug, short_description, content, cover_image,
      category, tags, status, language, seo_title, seo_description, seo_keywords
    }, adminId);

    return res.status(201).json({
      success: true,
      message: 'Post yaradıldı',
      data: post
    });
  } catch (error) {
    console.error('Create post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Post-u yenilə
 */
export async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const {
      title, slug, short_description, content, cover_image,
      category, tags, status, language, seo_title, seo_description, seo_keywords
    } = req.body;

    // Slug dəyişirsə, mövcudluğunu yoxla
    if (slug) {
      const existing = await blogModel.getBySlug(slug);
      if (existing && existing.id !== parseInt(id)) {
        return res.status(400).json({
          success: false,
          message: 'Bu slug artıq mövcuddur'
        });
      }
    }

    const post = await blogModel.update(id, {
      title, slug, short_description, content, cover_image,
      category, tags, status, language, seo_title, seo_description, seo_keywords
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post yeniləndi',
      data: post
    });
  } catch (error) {
    console.error('Update post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Post-u publish et
 */
export async function publishPost(req, res) {
  try {
    const { id } = req.params;

    const post = await blogModel.publish(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post publish edildi',
      data: post
    });
  } catch (error) {
    console.error('Publish post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Post-u sil
 */
export async function deletePost(req, res) {
  try {
    const { id } = req.params;

    await blogModel.delete(id);

    return res.status(200).json({
      success: true,
      message: 'Post silindi'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Kateqoriyalar
 */
export async function getCategories(req, res) {
  try {
    const categories = await blogModel.getCategories();

    return res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}
