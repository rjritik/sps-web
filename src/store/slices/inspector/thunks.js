/**
 * Inspector Thunks
 * Async action creators for block inspection operations
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSecurityChecks as fetchSecurityChecks,
  createBlockInspection as createBlockInspectionAPI,
  getBlockInspections as fetchBlockInspections
} from '../../../services/inspectorService';

/**
 * Async thunk to fetch security checks with blocks
 * @type {AsyncThunk}
 * @returns {Promise<Array>} Array of security checks with block details on success
 */
export const getSecurityChecks = createAsyncThunk(
  'inspector/getSecurityChecks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSecurityChecks();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch security checks');
    }
  }
);

/**
 * Async thunk to create a block inspection
 * @type {AsyncThunk}
 * @param {Object} blockInspection - The block inspection data to be created
 * @returns {Promise<Object>} Created block inspection data on success
 */
export const createBlockInspection = createAsyncThunk(
  'inspector/createBlockInspection',
  async (blockInspection, { rejectWithValue }) => {
    try {
      const response = await createBlockInspectionAPI(blockInspection);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create block inspection');
    }
  }
);

/**
 * Async thunk to fetch all block inspections
 * @type {AsyncThunk}
 * @returns {Promise<Array>} Array of block inspection records on success
 */
export const getBlockInspections = createAsyncThunk(
  'inspector/getBlockInspections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchBlockInspections();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch block inspections');
    }
  }
); 