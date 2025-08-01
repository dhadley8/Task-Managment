import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DemoAuthContext } from '../demo/DemoAuthContext';
import type { AuthContextType } from '../types';

export const useAuth = (): AuthContextType => {
  // Always call both hooks, but use demo context if available
  const demoContext = useContext(DemoAuthContext);
  const context = useContext(AuthContext);
  
  // Prefer demo context if it exists (for demo mode)
  if (demoContext) {
    return demoContext;
  }
  
  // Fall back to regular auth context
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider or DemoAuthProvider');
  }
  return context;
};
