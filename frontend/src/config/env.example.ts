// Environment variables configuration example
// Bu fayl production üçün nümunədir
// Real environment variables .env.production faylında olmalıdır

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  },
  site: {
    url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
    name: import.meta.env.VITE_SITE_NAME || 'Proep.az',
  },
  env: import.meta.env.VITE_ENV || 'development',
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'info@proep.az',
    phone: import.meta.env.VITE_CONTACT_PHONE || '+994502081108',
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Production üçün .env.production faylında:
// VITE_API_BASE_URL=https://api.proep.az/api
// VITE_SITE_URL=https://proep.az
