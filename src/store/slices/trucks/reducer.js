/**
 * Trucks Slice Reducer
 * Manages the state for trucks and security checks data in the Redux store
 */

import { createSlice } from '@reduxjs/toolkit';
import { getTrucks, getBlocksByTruck, createSecurityCheck } from './thunks';

/**
 * Initial state for the trucks slice
 * @type {Object}
 * @property {Array} trucks - List of truck objects
 * @property {Array} blocksByTruck - List of blocks grouped by truck
 * @property {Object|null} securityCheck - Latest security check data
 * @property {boolean} isLoading - Loading state for async operations
 * @property {string|null} error - Error message if any operation fails
 */
const initialState = {
  trucks: [],
  blocksByTruck: [],
  securityCheck: null,
  isLoading: false,
  error: null,
};

/**
 * Trucks slice configuration
 * Handles state updates for trucks-related actions
 */
const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
    clearSecurityCheck: (state) => {
      state.securityCheck = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getTrucks states
      .addCase(getTrucks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTrucks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trucks = action.payload;
      })
      .addCase(getTrucks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Handle getBlocksByTruck states
      .addCase(getBlocksByTruck.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlocksByTruck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blocksByTruck = action.payload;
      })
      .addCase(getBlocksByTruck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Handle createSecurityCheck states
      .addCase(createSecurityCheck.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSecurityCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.securityCheck = action.payload;
      })
      .addCase(createSecurityCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSecurityCheck } = trucksSlice.actions;
export default trucksSlice.reducer; 