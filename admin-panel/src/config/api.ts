// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    verify: `${API_BASE_URL}/api/auth/verify`,
    changePassword: `${API_BASE_URL}/api/auth/change-password`,
  },

  // Admin endpoints
  admin: {
    messages: `${API_BASE_URL}/api/admin/messages`,
    users: `${API_BASE_URL}/api/admin/users`,
    blog: `${API_BASE_URL}/api/admin/blog`,
    portfolio: `${API_BASE_URL}/api/admin/portfolio`,
    serverStats: `${API_BASE_URL}/api/admin/server-stats`,
  },
};

// API helper function
export async function apiRequest(url, options = {}) {
  const token = localStorage.getItem('adminToken');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      // Token expired or invalid
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/';
        throw new Error('Session expired');
      }

      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

export default api;
