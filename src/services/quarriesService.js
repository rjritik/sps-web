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

/**
 * Create the block for any quarry
 * @param {object} blockData - Payload for the block data
 * @returns {Promise<Object>} Block details object
 * @throws {Error} When adding the block quarry details fails
 */
export const createBlock = async (blockData) => {
  try {
    const response = await api.post(`/api/blocks`, blockData);
    return response.data;
  } catch (error) {
    // It's good practice to log or re-throw the error for thunk to catch
    console.error(
      "Error creating block:",
      error.response?.data || error.message
    );
    throw error; // Re-throw to be caught by Redux Thunk's rejected action
  }
};
