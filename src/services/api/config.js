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

  return api;
};

/**
 * Default API instance for use across services
 */
export const api = createApiInstance(); 