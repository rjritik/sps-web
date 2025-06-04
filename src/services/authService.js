/**
 * Authentication Service
 * Handles all API calls related to authentication
 */

import { api } from './api/config';

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
    const response = await api.post('/api/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

