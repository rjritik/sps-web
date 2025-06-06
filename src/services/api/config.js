/**
 * API Configuration
 * Common configuration for API calls across the application
 */

import axios from 'axios';

/**
 * Base API URL from environment variables
 * Fallback to localhost if not defined
 */
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Creates and configures an axios instance with common settings
 * - Sets base URL
 * - Configures default headers
 * - Adds token interceptor
 * 
 * @returns {import('axios').AxiosInstance} Configured axios instance
 */
export const createApiInstance = () => {
  /**
   * Axios instance with default configuration
   */
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request interceptor
   * Automatically adds the JWT token to all requests if it exists in localStorage
   */
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

   // ✅ Centralized error handling
   api.interceptors.response.use(
    (response) => response, // pass successful response
    (error) => {
      // Extract useful info
      const customError = {
        status: error.response?.status || 500,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Something went wrong. Please try again.',
        original: error,
      };

      // Optional: Log to console or monitoring service
      console.error('API Error:', customError);

      // Throw the custom error object
      return Promise.reject(customError);
    }
  );

  return api;
};

/**
 * Default API instance for use across services
 */
export const api = createApiInstance(); 