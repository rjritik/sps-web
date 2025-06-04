/**
 * Protected Route Component
 * Handles role-based access control for routes
 */

import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getDefaultRouteForRoles, hasAllowedRole } from './routeHelpers';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userRoles = user?.roles?.map(role => role.name) || [];

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (hasAllowedRole(userRoles, allowedRoles)) {
    return <>{children}</>;
  }
  
  return <Navigate to={getDefaultRouteForRoles(userRoles)} replace />;
};

export default ProtectedRoute; 