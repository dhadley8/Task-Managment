import React from 'react';
import { TaskProvider } from '../context/TaskContext';

// Simple wrapper that uses the existing TaskProvider for demo mode
export const DemoTaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <TaskProvider>{children}</TaskProvider>;
};
