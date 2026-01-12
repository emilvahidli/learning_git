import usersModel from '../models/usersModel.js';
import { hashPassword } from '../utils/auth.js';

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
    const { username, password, full_name, email, phone_number, company, position, status, can_delete } = req.body;

    // Validation
    if (!username || !full_name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username, ad və email tələb olunur'
      });
    }

    // Yeni user üçün password mütləq olmalıdır
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Yeni istifadəçi üçün şifrə tələb olunur'
      });
    }

    // Username-in mövcudluğunu yoxla
    const existingByUsername = await usersModel.getByUsername?.(username);
    if (existingByUsername) {
      return res.status(400).json({
        success: false,
        message: 'Bu username artıq mövcuddur'
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

    // Şifrəni hash-lə
    const passwordHash = password ? await hashPassword(password) : null;

    const user = await usersModel.create({
      username,
      password_hash: passwordHash,
      full_name,
      email,
      phone_number,
      company,
      position,
      status: status || 'active',
      can_delete: can_delete !== undefined ? can_delete : true
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
      message: error.message || 'Server xətası'
    });
  }
}

/**
 * İstifadəçini yenilə
 */
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, password, full_name, email, phone_number, company, position, status, can_delete } = req.body;

    // Username dəyişirsə, mövcudluğunu yoxla
    if (username) {
      const existingByUsername = await usersModel.getByUsername(username);
      if (existingByUsername && existingByUsername.id !== parseInt(id)) {
        return res.status(400).json({
          success: false,
          message: 'Bu username artıq mövcuddur'
        });
      }
    }

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

    // Şifrəni hash-lə (əgər verilibsə)
    const passwordHash = password ? await hashPassword(password) : undefined;

    const user = await usersModel.update(id, {
      username,
      password_hash: passwordHash,
      full_name,
      email,
      phone_number,
      company,
      position,
      status,
      can_delete
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
      message: error.message || 'Server xətası'
    });
  }
}

/**
 * İstifadəçini sil
 */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // İstifadəçini tap və can_delete yoxla
    const user = await usersModel.getById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'İstifadəçi tapılmadı'
      });
    }

    if (!user.can_delete) {
      return res.status(403).json({
        success: false,
        message: 'Bu istifadəçini silmək üçün icazəniz yoxdur'
      });
    }

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
