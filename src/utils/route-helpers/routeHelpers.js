/**
 * Helper functions for route management and role-based access control
 */

/**
 * Determines the default route based on user roles
 * @param {Array<string>} roles - Array of user role names
 * @returns {string} The default route path
 */
export const getDefaultRouteForRoles = (roles) => {
  if (roles.includes("block_manager")) {
    return "/quarry";
  } else if (roles.includes("security_manager")) {
    return "/security-check";
  } else if (roles.includes("block_inspector")) {
    return "/block-inspection";
  } else {
    return "/login";
  }
};

/**
 * Checks if a user has any of the allowed roles
 * @param {Array<string>} userRoles - Array of user's role names
 * @param {Array<string>} allowedRoles - Array of roles that are allowed
 * @returns {boolean} Whether the user has any of the allowed roles
 */
export const hasAllowedRole = (userRoles, allowedRoles) => {
  return userRoles.some(role => allowedRoles.includes(role));
}; 