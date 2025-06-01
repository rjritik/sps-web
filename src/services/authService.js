/**
 * Authentication Service
 * Handles all API calls related to authentication
 */

import axios from 'axios';

/**
 * Base API URL from environment variables
 * Fallback to localhost if not defined
 */
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Axios instance with default configuration
 * - Sets base URL for all requests
 * - Configures default headers
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Automatically adds the JWT token to all requests if it exists in localStorage
 * This ensures authenticated requests without manually adding the token each time
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Authenticates a user with their credentials
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} Response containing user data and token
 * @throws {Error} When authentication fails
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the current authenticated user's data
 * Requires a valid JWT token in localStorage
 * @returns {Promise<Object>} Current user's data
 * @throws {Error} When fetching user data fails or token is invalid
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error;
  }
}; 