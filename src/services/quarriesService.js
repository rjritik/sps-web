/**
 * Quarries Service
 * Handles all API calls related to quarries management
 */

import { api } from "./api/config";

/**
 * Fetches all quarries from the API
 * @returns {Promise<Array>} Array of quarry objects containing details
 * @throws {Error} When fetching quarries fails
 */
export const getQuarries = async () => {
  try {
    const response = await api.get("/api/quarries");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches quarry details by reference ID
 * @param {string} referenceId - The reference ID of the quarry
 * @returns {Promise<Object>} Quarry details object
 * @throws {Error} When fetching quarry details fails
 */
export const getQuarryByReferenceId = async (referenceId) => {
  try {
    const response = await api.get(`/api/blocks/quarry/${referenceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
