import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

const adminAPI = {
  // Get dashboard analytics
  getDashboardAnalytics: () => api.get('/admin/analytics'),

  // Get all users
  getAllUsers: () => api.get('/admin/users'),

  // Get all doctors
  getAllDoctors: () => api.get('/admin/doctors'),

  // Update user status
  updateUserStatus: (userId, status) => api.put(`/admin/users/${userId}/status`, { status }),

  // Review doctor application
  reviewDoctor: (doctorId, status) => api.put(`/admin/doctors/${doctorId}/review`, { status }),
};

export default adminAPI;