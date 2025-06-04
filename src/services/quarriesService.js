/**
 * Quarries Service
 * Handles all API calls related to quarries management
 */

import { api } from './api/config';

/**
 * Fetches all quarries from the API
 * @returns {Promise<Array>} Array of quarry objects containing details
 * @throws {Error} When fetching quarries fails
 */
export const getQuarries = async () => {
  try {
    const response = await api.get('/api/quarries');
    return response.data;
  } catch (error) {
    throw error;
  }
};

