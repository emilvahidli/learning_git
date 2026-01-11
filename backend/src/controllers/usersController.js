import usersModel from '../models/usersModel.js';

/**
 * Bütün istifadəçiləri əldə et
 */
export async function getAllUsers(req, res) {
  try {
    const { status, search, limit = 50, offset = 0 } = req.query;
    
    const users = await usersModel.getAll({
      status,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const stats = await usersModel.getStats();

    return res.status(200).json({
      success: true,
      data: {
        users,
        stats
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Bir istifadəçini əldə et
 */
export async function getUser(req, res) {
  try {
    const { id } = req.params;
    
    const user = await usersModel.getById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Yeni istifadəçi yarat
 */
export async function createUser(req, res) {
  try {
    const { full_name, email, phone_number, company, position, status, notes } = req.body;

    // Validation
    if (!full_name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Ad və email tələb olunur'
      });
    }

    // Email-in mövcudluğunu yoxla
    const existing = await usersModel.getByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Bu email artıq mövcuddur'
      });
    }

    const user = await usersModel.create({
      full_name,
      email,
      phone_number,
      company,
      position,
      status,
      notes
    });

    return res.status(201).json({
      success: true,
      message: 'İstifadəçi yaradıldı',
      data: user
    });
  } catch (error) {
    console.error('Create user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * İstifadəçini yenilə
 */
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { full_name, email, phone_number, company, position, status, notes } = req.body;

    // Email dəyişirsə, mövcudluğunu yoxla
    if (email) {
      const existing = await usersModel.getByEmail(email);
      if (existing && existing.id !== parseInt(id)) {
        return res.status(400).json({
          success: false,
          message: 'Bu email artıq mövcuddur'
        });
      }
    }

    const user = await usersModel.update(id, {
      full_name,
      email,
      phone_number,
      company,
      position,
      status,
      notes
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'İstifadəçi yeniləndi',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * İstifadəçini sil
 */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await usersModel.delete(id);

    return res.status(200).json({
      success: true,
      message: 'İstifadəçi silindi'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}
