/**
 * Authentication Thunks
 * Redux Toolkit async thunks for handling authentication-related async operations
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../../services/authService';

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

      const { user, token } = response;
      // Store auth data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      
      // Extract and store role names
      if (user?.roles?.length > 0) {
        const roleNames = user.roles.map(role => role.name);
        localStorage.setItem("userRoles", JSON.stringify(roleNames));
      }

      return response; // Must include { user, token }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);
