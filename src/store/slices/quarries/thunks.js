/**
 * Quarries Thunks
 * Async action creators for quarries-related operations
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBlock,
  getQuarries as fetchQuarries,
  getQuarryByReferenceId as fetchQuarryByReferenceId,
} from "../../../services/quarriesService";

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
  "quarries/getQuarries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchQuarries();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quarries"
      );
    }
  }
);

/**
 * Async thunk to fetch quarry details by reference ID
 * Dispatches pending/fulfilled/rejected actions based on API response
 *
 * @type {AsyncThunk}
 * @param {string} referenceId - The reference ID of the quarry
 * @param {Object} thunkAPI - Object containing Redux toolkit's utility functions
 * @param {Function} thunkAPI.rejectWithValue - Function to handle rejection with a custom value
 * @returns {Promise<Object>} Quarry details object on success
 * @throws {Error} Custom error message on failure
 */
export const getQuarryByReferenceId = createAsyncThunk(
  "quarries/getQuarryByReferenceId",
  async (referenceId, { rejectWithValue }) => {
    try {
      const response = await fetchQuarryByReferenceId(referenceId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch quarry details"
      );
    }
  }
);

/**
 * Add a new block to the quarry
 * @param {Object} blockData - Data for the block to be created
 * @returns {Object} - Newly created block data
 */
export const addBlock = createAsyncThunk(
  "quarries/addBlock",
  async (blockData, { rejectWithValue }) => {
    try {
      const response = await createBlock(blockData);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating block:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
