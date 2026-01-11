// API Configuration
// Production-da eyni domain-də /api path istifadə edirik (Nginx reverse proxy)
// Development-da localhost:3000 istifadə edirik
const API_BASE_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || '') // Production: empty string (same domain) və ya /api
  : (import.meta.env.VITE_API_URL || 'http://localhost:3000'); // Development: localhost

export const api = {
  baseURL: API_BASE_URL,
  
  // Appeal endpoint
  // Production-da: /api/appeal (Nginx /api -> localhost:3000)
  // Development-da: http://localhost:3000/api/appeal
  appeal: import.meta.env.PROD 
    ? '/api/appeal' 
    : `${API_BASE_URL}/api/appeal`,
  
  // Health check
  health: import.meta.env.PROD 
    ? '/health' 
    : `${API_BASE_URL}/health`,
  
  // Public API endpoints
  public: {
    blog: import.meta.env.PROD
      ? '/api/public/blog'
      : `${API_BASE_URL}/api/public/blog`,
    portfolio: import.meta.env.PROD
      ? '/api/public/portfolio'
      : `${API_BASE_URL}/api/public/portfolio`,
  },
};

export default api;
