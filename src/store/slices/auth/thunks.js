/**
 * Authentication Thunks
 * Redux Toolkit async thunks for handling authentication-related async operations
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, getCurrentUser } from '../../../services/authService';

/**
 * Login Thunk
 * Handles the authentication process and token storage
 * 
 * @type {AsyncThunk}
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * 
 * On success:
 * - Stores JWT token in localStorage
 * - Returns user data and token
 * 
 * On failure:
 * - Returns error message through rejectWithValue
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      // Store token in localStorage for persistence
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

/**
 * Fetch Current User Thunk
 * Retrieves the currently authenticated user's data
 * 
 * @type {AsyncThunk}
 * @param {void} _ - No parameters needed
 * 
 * On success:
 * - Returns current user's data
 * 
 * On failure:
 * - Returns error message through rejectWithValue
 * - Typically fails if token is invalid or expired
 */
export const fetchCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user data');
    }
  }
); 