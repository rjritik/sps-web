/**
 * Authentication Reducer
 * Manages the authentication state of the application
 */

import { createSlice } from '@reduxjs/toolkit';
import { login } from './thunks';

/**
 * Initial state for the auth slice
 * @typedef {Object} AuthState
 * @property {Object|null} user - The currently authenticated user's data
 * @property {string|null} token - JWT token stored in localStorage
 * @property {boolean} isAuthenticated - Whether a user is currently authenticated
 * @property {boolean} isLoading - Whether an auth operation is in progress
 * @property {string|null} error - Any error messages from auth operations
 */
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  userRoles: JSON.parse(localStorage.getItem('userRoles')) || [],
  isLoading: false,
  error: null,
};

/**
 * Auth Slice
 * Contains reducers and actions for authentication state management
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Logout action
     * Clears all auth state and removes token from localStorage
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRoles');
      localStorage.setItem("isAuthenticated", "false");
    },
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Clear error action
     * Resets any error messages in the state
     */
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login action handlers
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
     
    
  },
});

// Export actions and reducer
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 