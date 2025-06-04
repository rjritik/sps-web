/**
 * Trucks Service
 * Handles all API calls related to trucks and security checks management
 */

import { api } from './api/config';

/**
 * Fetches all trucks from the API
 * @returns {Promise<Array>} Array of truck objects containing details
 * @throws {Error} When fetching trucks fails
 */
export const getTrucks = async () => {
  try {
    const response = await api.get('/api/security/truck-details');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches blocks by truck from the API
 * @returns {Promise<Array>} Array of blocks grouped by truck
 * @throws {Error} When fetching blocks fails
 */
export const getBlocksByTruck = async () => {
  try {
    const response = await api.get('/api/security/blocks-by-truck');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a new security check
 * @param {Object} securityCheckData - The security check data
 * @param {string} securityCheckData.blockMarkerRefNumber - Reference number for the block marker
 * @param {string} securityCheckData.dateTime - Date and time of the security check
 * @param {boolean} securityCheckData.wrapping - Whether wrapping is required
 * @param {string} securityCheckData.securityPersonnelName - Name of the security personnel
 * @param {string} securityCheckData.invoiceNumber - Invoice number
 * @param {Object} securityCheckData.truckDetails - Details of the truck
 * @returns {Promise<Object>} Created security check data
 * @throws {Error} When creating security check fails
 */
export const createSecurityCheck = async (securityCheckData) => {
  try {
    const response = await api.post('/api/security/create-security-check', securityCheckData);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 