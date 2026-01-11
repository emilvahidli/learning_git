import portfolioModel from '../models/portfolioModel.js';

/**
 * Bütün portfolio layihələri
 */
export async function getAllProjects(req, res) {
  try {
    const { status, featured, search, limit = 50, offset = 0 } = req.query;
    
    const projects = await portfolioModel.getAll({
      status,
      featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const stats = await portfolioModel.getStats();

    return res.status(200).json({
      success: true,
      data: {
        projects,
        stats
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Bir layihə əldə et
 */
export async function getProject(req, res) {
  try {
    const { id } = req.params;
    
    const project = await portfolioModel.getById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Layihə tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Yeni layihə yarat
 */
export async function createProject(req, res) {
  try {
    const adminId = req.admin.id;
    const data = req.body;

    // Validation
    if (!data.title_az || !data.title_en || !data.slug || !data.short_description_az || !data.short_description_en) {
      return res.status(400).json({
        success: false,
        message: 'Başlıqlar, slug və qısa təsvirlər tələb olunur'
      });
    }

    // Slug-ın mövcudluğunu yoxla
    const existing = await portfolioModel.getBySlug(data.slug);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Bu slug artıq mövcuddur'
      });
    }

    const project = await portfolioModel.create(data, adminId);

    return res.status(201).json({
      success: true,
      message: 'Layihə yaradıldı',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Layihəni yenilə
 */
export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    // Slug dəyişirsə, mövcudluğunu yoxla
    if (data.slug) {
      const existing = await portfolioModel.getBySlug(data.slug);
      if (existing && existing.id !== parseInt(id)) {
        return res.status(400).json({
          success: false,
          message: 'Bu slug artıq mövcuddur'
        });
      }
    }

    const project = await portfolioModel.update(id, data);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Layihə tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Layihə yeniləndi',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Layihəni publish et
 */
export async function publishProject(req, res) {
  try {
    const { id } = req.params;

    const project = await portfolioModel.publish(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Layihə tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Layihə publish edildi',
      data: project
    });
  } catch (error) {
    console.error('Publish project error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Layihəni sil
 */
export async function deleteProject(req, res) {
  try {
    const { id } = req.params;

    await portfolioModel.delete(id);

    return res.status(200).json({
      success: true,
      message: 'Layihə silindi'
    });
  } catch (error) {
    console.error('Delete project error:', error);
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
    const categories = await portfolioModel.getCategories();

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
