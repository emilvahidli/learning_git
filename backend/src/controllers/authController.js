import adminModel from '../models/adminModel.js';
import { 
  hashPassword, 
  verifyPassword, 
  generateToken, 
  hashToken,
  getIpAddress,
  getUserAgent 
} from '../utils/auth.js';

/**
 * Admin Login
 */
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username və şifrə tələb olunur'
      });
    }

    // Admin-i tap
    const admin = await adminModel.findByUsername(username);
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'İstifadəçi adı və ya şifrə yanlışdır'
      });
    }

    // Şifrəni yoxla
    const isPasswordValid = await verifyPassword(password, admin.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'İstifadəçi adı və ya şifrə yanlışdır'
      });
    }

    // Token yarat
    const token = generateToken({
      id: admin.id,
      username: admin.username,
      role: admin.role
    });

    // Token-ı hash-lə və database-ə yaz
    const tokenHash = hashToken(token);
    const ipAddress = getIpAddress(req);
    const userAgent = getUserAgent(req);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat

    await adminModel.createSession(admin.id, tokenHash, ipAddress, userAgent, expiresAt);

    // Son login tarixini yenilə
    await adminModel.updateLastLogin(admin.id);

    // Köhnə sessionları təmizlə (background)
    adminModel.cleanExpiredSessions().catch(err => 
      console.error('Session cleanup error:', err)
    );

    // Response
    return res.status(200).json({
      success: true,
      message: 'Giriş uğurlu',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          fullName: admin.full_name,
          email: admin.email,
          role: admin.role
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Admin Logout
 */
export async function logout(req, res) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const tokenHash = hashToken(token);
      await adminModel.deleteSession(tokenHash);
    }

    return res.status(200).json({
      success: true,
      message: 'Çıxış uğurlu'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Token-ı yoxla və admin məlumatlarını qaytar
 */
export async function verifyAuth(req, res) {
  try {
    const admin = req.admin; // middleware-dən gəlir

    return res.status(200).json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          username: admin.username,
          fullName: admin.full_name,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.last_login
        }
      }
    });

  } catch (error) {
    console.error('Verify auth error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}

/**
 * Şifrəni dəyişdir
 */
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Cari və yeni şifrə tələb olunur'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Yeni şifrə ən azı 6 simvol olmalıdır'
      });
    }

    // Admin-i tap
    const admin = await adminModel.findByUsername(req.admin.username);

    // Cari şifrəni yoxla
    const isPasswordValid = await verifyPassword(currentPassword, admin.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Cari şifrə yanlışdır'
      });
    }

    // Yeni şifrəni hash-lə
    const newPasswordHash = await hashPassword(newPassword);

    // Database-də yenilə
    await adminModel.updatePassword(adminId, newPasswordHash);

    return res.status(200).json({
      success: true,
      message: 'Şifrə uğurla dəyişdirildi'
    });

  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server xətası'
    });
  }
}
