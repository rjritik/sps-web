/**
 * Quarries Slice Reducer
 * Manages the state for quarries data in the Redux store
 */

import { createSlice } from "@reduxjs/toolkit";
import { getQuarries, getQuarryByReferenceId } from "./thunks";

/**
 * Initial state for the quarries slice
 * @type {Object}
 * @property {Array} quarries - List of quarry objects
 * @property {Array} blockByQuarry - Currently selected quarry details
 * @property {boolean} isLoading - Loading state for async operations
 * @property {string|null} error - Error message if any operation fails
 */
const initialState = {
  quarries: [],
  blockByQuarry: [],
  isLoading: false,
  error: null,
};

/**
 * Quarries slice configuration
 * Handles state updates for quarries-related actions
 */
const quarriesSlice = createSlice({
  name: "quarries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state for getQuarries
      .addCase(getQuarries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle successful quarries fetch
      .addCase(getQuarries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quarries = action.payload;
      })
      // Handle failed quarries fetch
      .addCase(getQuarries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Handle pending state for getQuarryByReferenceId
      .addCase(getQuarryByReferenceId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Handle successful quarry details fetch
      .addCase(getQuarryByReferenceId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blockByQuarry = action.payload;
      })
      // Handle failed quarry details fetch
      .addCase(getQuarryByReferenceId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default quarriesSlice.reducer;
