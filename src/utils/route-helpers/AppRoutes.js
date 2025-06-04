import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { routes } from './routes';
import { getDefaultRouteForRoles } from './routeHelpers';
import ProtectedRoute from './ProtectedRoute';

/**
 * AppRoutes Component
 * Handles all application routing logic including protected routes and redirects
 */
const AppRoutes = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const userRoles = user?.roles?.map(role => role.name) || [];

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.isPublic ? (
              isAuthenticated ? (
                <Navigate to={getDefaultRouteForRoles(userRoles)} replace />
              ) : (
                <route.component />
              )
            ) : (
              <ProtectedRoute allowedRoles={route.allowedRoles}>
                <route.component />
              </ProtectedRoute>
            )
          }
        />
      ))}
      
      {/* Default and catch-all routes */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? getDefaultRouteForRoles(userRoles) : "/login"}
            replace
          />
        }
      />
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? getDefaultRouteForRoles(userRoles) : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes; 