import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import type { TaskContextType } from '../types';

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
