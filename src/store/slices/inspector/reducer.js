/**
 * Inspector Slice Reducer
 * Manages the state for block inspections and security checks in the Redux store
 */

import { createSlice } from '@reduxjs/toolkit';
import { getSecurityChecks, createBlockInspection, getBlockInspections } from './thunks';

/**
 * Initial state for the inspector slice
 * @type {Object}
 * @property {Array} securityChecks - List of security checks with block details
 * @property {Array} blockInspections - List of block inspection records
 * @property {Object|null} currentInspection - Latest created block inspection
 * @property {boolean} isLoading - Loading state for async operations
 * @property {string|null} error - Error message if any operation fails
 */
const initialState = {
  securityChecks: [],
  blockInspections: [],
  currentInspection: null,
  isLoading: false,
  error: null,
};

/**
 * Inspector slice configuration
 * Handles state updates for block inspection-related actions
 */
const inspectorSlice = createSlice({
  name: 'inspector',
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
    clearCurrentInspection: (state) => {
      state.currentInspection = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getSecurityChecks states
      .addCase(getSecurityChecks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSecurityChecks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.securityChecks = action.payload;
      })
      .addCase(getSecurityChecks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Handle createBlockInspection states
      .addCase(createBlockInspection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlockInspection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentInspection = action.payload;
        state.blockInspections.push(action.payload);
      })
      .addCase(createBlockInspection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Handle getBlockInspections states
      .addCase(getBlockInspections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlockInspections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blockInspections = action.payload;
      })
      .addCase(getBlockInspections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentInspection } = inspectorSlice.actions;
export default inspectorSlice.reducer; 