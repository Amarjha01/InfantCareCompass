import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with auth header
const createAuthInstance = () => {
  const token = getAuthToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

// Growth Tracker API functions
export const growthTrackerAPI = {
  // Create a new growth log entry
  createGrowthLog: async (growthData) => {
    try {
      const response = await createAuthInstance().post('/growth-logs', growthData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create growth log' };
    }
  },

  // Get all growth logs for a user
  getGrowthLogs: async (params = {}) => {
    try {
      const response = await createAuthInstance().get('/growth-logs', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch growth logs' };
    }
  },

  // Get a specific growth log by ID
  getGrowthLogById: async (id) => {
    try {
      const response = await createAuthInstance().get(`/growth-logs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch growth log' };
    }
  },

  // Update a growth log
  updateGrowthLog: async (id, updateData) => {
    try {
      const response = await createAuthInstance().put(`/growth-logs/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update growth log' };
    }
  },

  // Delete a growth log
  deleteGrowthLog: async (id) => {
    try {
      const response = await createAuthInstance().delete(`/growth-logs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete growth log' };
    }
  },

  // Update reminder settings
  updateReminderSettings: async (settings) => {
    try {
      const response = await createAuthInstance().patch('/growth-logs/reminder-settings', settings);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update reminder settings' };
    }
  },

  // Get growth statistics
  getGrowthStats: async (childId) => {
    try {
      const response = await createAuthInstance().get('/growth-logs/stats', {
        params: { childId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch growth statistics' };
    }
  }
};

export default growthTrackerAPI;
