import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  requireAuth = true
}) => {
  const { user } = useAuth();
  const location = useLocation();

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace data-id="12p8wq4ll" data-path="src/components/ProtectedRoute.tsx" />;
  }

  // If user is logged in but not in auth page, and there are role restrictions
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace data-id="imc44sxit" data-path="src/components/ProtectedRoute.tsx" />;
      case 'user':
        return <Navigate to="/user/stores" replace data-id="9o8b6a0ra" data-path="src/components/ProtectedRoute.tsx" />;
      case 'store_owner':
        return <Navigate to="/store-owner/dashboard" replace data-id="0jt4phupr" data-path="src/components/ProtectedRoute.tsx" />;
      default:
        return <Navigate to="/login" replace data-id="dsy3mpk8l" data-path="src/components/ProtectedRoute.tsx" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;