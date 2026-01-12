/**
 * Error handler utility
 * Bütün controller-lərdə istifadə üçün
 */

export function handleError(error, res, customMessage = null) {
  console.error('Error:', error);
  
  // Database errors
  if (error.code) {
    switch (error.code) {
      case '23505': // Unique violation
        if (error.constraint?.includes('username')) {
          return res.status(400).json({
            success: false,
            message: 'Bu username artıq mövcuddur'
          });
        }
        if (error.constraint?.includes('email')) {
          return res.status(400).json({
            success: false,
            message: 'Bu email artıq mövcuddur'
          });
        }
        if (error.constraint?.includes('slug')) {
          return res.status(400).json({
            success: false,
            message: 'Bu slug artıq mövcuddur'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Bu məlumat artıq mövcuddur'
        });
      
      case '23502': // Not null violation
        return res.status(400).json({
          success: false,
          message: 'Bütün mütləq sahələr doldurulmalıdır'
        });
      
      case '23503': // Foreign key violation
        return res.status(400).json({
          success: false,
          message: 'Əlaqəli məlumat tapılmadı'
        });
      
      case '42P01': // Table does not exist
        return res.status(500).json({
          success: false,
          message: 'Database table tapılmadı',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      
      case 'ECONNREFUSED': // Database connection refused
        return res.status(500).json({
          success: false,
          message: 'Database bağlantısı uğursuz oldu',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
  }
  
  // Default error response
  return res.status(500).json({
    success: false,
    message: customMessage || error.message || 'Server xətası',
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
}
