import React, { createContext, useState } from 'react';
import type { AuthContextType, User } from '../types';

export const DemoAuthContext = createContext<AuthContextType | null>(null);

interface DemoAuthProviderProps {
  children: React.ReactNode;
}

export const DemoAuthProvider: React.FC<DemoAuthProviderProps> = ({ children }) => {
  const [isAuthenticated] = useState(true);
  const [isLoading] = useState(false);
  
  // Demo user data
  const user: User = {
    id: 'demo-user-123',
    email: 'demo@example.com',
    name: 'Demo User',
    picture: undefined,
    emailVerified: true,
  };

  const login = () => {
    // In demo mode, user is always logged in
    console.log('Demo mode: User is always authenticated');
  };

  const logout = () => {
    // In demo mode, redirect to home
    window.location.href = '/';
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
};
