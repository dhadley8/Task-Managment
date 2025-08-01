import { useContext } from 'react';
import { DemoAuthContext } from '../demo/DemoAuthContext';
import type { AuthContextType } from '../types';

export const useDemoAuth = (): AuthContextType => {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
};
