import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../Loading/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-prompt">
        <div className="auth-prompt-content">
          <h2>Please log in to access your tasks</h2>
          <p>You need to be authenticated to view and manage your tasks.</p>
          <button 
            className="login-button"
            onClick={login}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
