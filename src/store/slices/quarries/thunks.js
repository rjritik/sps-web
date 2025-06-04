/**
 * Quarries Thunks
 * Async action creators for quarries-related operations
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getQuarries as fetchQuarries } from '../../../services/quarriesService';

/**
 * Async thunk to fetch all quarries
 * Dispatches pending/fulfilled/rejected actions based on API response
 * 
 * @type {AsyncThunk}
 * @param {void} _ - No parameters needed
 * @param {Object} thunkAPI - Object containing Redux toolkit's utility functions
 * @param {Function} thunkAPI.rejectWithValue - Function to handle rejection with a custom value
 * @returns {Promise<Array>} Array of quarry objects on success
 * @throws {Error} Custom error message on failure
 */
export const getQuarries = createAsyncThunk(
  'quarries/getQuarries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchQuarries();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch quarries');
    }
  }
); 