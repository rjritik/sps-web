/**
 * Inspector Service
 * Handles all API calls related to block inspections and security checks
 */

import { api } from './api/config';

/**
 * Fetches all security checks with associated blocks
 * @returns {Promise<Array>} Array of security checks with block details
 * @throws {Error} When fetching security checks fails
 */
export const getSecurityChecks = async () => {
  try {
    const response = await api.get('/api/block-inspections/security-checks-with-blocks');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a new block inspection
 * @param {Object} blockInspection - The block inspection data
 * @param {string} blockInspection.blockMarkerRefNumber - Reference number for the block
 * @param {Object} blockInspection.blockSecurity - Security details of the block
 * @param {Object} blockInspection.dimension - Dimensions of the block
 * @param {Object} blockInspection.observations - Observations made during inspection
 * @param {Object} blockInspection.crackFractureDetection - Crack and fracture details
 * @param {Object} blockInspection.attachments - Attached files and documents
 * @returns {Promise<Object>} Created block inspection data
 * @throws {Error} When creating block inspection fails
 */
export const createBlockInspection = async (blockInspection) => {
  try {
    const response = await api.post('/api/block-inspections', blockInspection);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches all block inspections
 * @returns {Promise<Array>} Array of block inspection records
 * @throws {Error} When fetching block inspections fails
 */
export const getBlockInspections = async () => {
  try {
    const response = await api.get('/api/block-inspections');
    return response.data;
  } catch (error) {
    throw error;
  }
}; 