// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  baseURL: API_BASE_URL,
  
  // Appeal endpoint
  appeal: `${API_BASE_URL}/api/appeal`,
  
  // Health check
  health: `${API_BASE_URL}/health`,
};

export default api;
