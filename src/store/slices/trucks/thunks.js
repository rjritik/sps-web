/**
 * Trucks Thunks
 * Async action creators for trucks-related operations
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTrucks as fetchTrucks,
  getBlocksByTruck as fetchBlocksByTruck,
  createSecurityCheck as createSecurityCheckAPI
} from '../../../services/trucksService';

/**
 * Async thunk to fetch all trucks
 * @type {AsyncThunk}
 * @returns {Promise<Array>} Array of truck objects on success
 */
export const getTrucks = createAsyncThunk(
  'trucks/getTrucks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTrucks();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trucks');
    }
  }
);

/**
 * Async thunk to fetch blocks by truck
 * @type {AsyncThunk}
 * @returns {Promise<Array>} Array of blocks grouped by truck on success
 */
export const getBlocksByTruck = createAsyncThunk(
  'trucks/getBlocksByTruck',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchBlocksByTruck();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blocks by truck');
    }
  }
);

/**
 * Async thunk to create a security check
 * @type {AsyncThunk}
 * @param {Object} securityCheckData - The security check data to be created
 * @returns {Promise<Object>} Created security check data on success
 */
export const createSecurityCheck = createAsyncThunk(
  'trucks/createSecurityCheck',
  async (securityCheckData, { rejectWithValue }) => {
    try {
      const response = await createSecurityCheckAPI(securityCheckData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create security check');
    }
  }
); 