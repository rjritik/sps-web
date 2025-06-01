/**
 * Redux Store Configuration
 * Central state management setup for the application
 */

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';

/**
 * Configure and create the Redux store
 */
export const store = configureStore({
  /**
   * Root reducer configuration
   * Combines all slice reducers into the root state
   * Current slices:
   * - auth: Handles authentication state
   */
  reducer: {
    auth: authReducer,
  },

  /**
   * Middleware configuration
   * @param {Function} getDefaultMiddleware - Returns default middleware array
   * 
   * Configuration:
   * - serializableCheck: Disabled to allow non-serializable values
   *   (useful for handling Promises and other complex objects in the state)
   * 
   * Note: Be cautious with non-serializable values as they can cause issues
   * with state persistence and time-travel debugging
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 