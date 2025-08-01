import React, { createContext, useEffect, useState, useCallback } from 'react';
import type { Task, TaskContextType, TaskFilter, TaskFormData, LoadingState, AppError } from '../types';
import { 
  generateTaskId, 
  sortTasks, 
  filterTasks, 
  calculateTaskStats,
  saveTasksToStorage,
  loadTasksFromStorage
} from '../utils/taskUtils';
import { useAuth } from '../hooks/useAuth';

export const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilterState] = useState<TaskFilter>({
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  // Load tasks from storage when user authenticates
  useEffect(() => {
    if (isAuthenticated && user) {
      const storedTasks = loadTasksFromStorage();
      const userTasks = storedTasks.filter(task => task.userId === user.id);
      setTasks(userTasks);
    } else {
      setTasks([]);
    }
  }, [isAuthenticated, user]);

  // Save tasks to storage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0 && user) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, user]);

  // Calculate filtered tasks
  const filteredTasks = React.useMemo(() => {
    let filtered = filterTasks(tasks, filter);
    if (filter.sortBy) {
      filtered = sortTasks(filtered, filter.sortBy, filter.sortOrder);
    }
    return filtered;
  }, [tasks, filter]);

  // Calculate stats
  const stats = React.useMemo(() => {
    return calculateTaskStats(tasks);
  }, [tasks]);

  const setError = useCallback((error: AppError | null) => {
    setLoading(prev => ({ ...prev, error }));
  }, []);

  const setLoadingState = useCallback((isLoading: boolean) => {
    setLoading(prev => ({ ...prev, isLoading }));
  }, []);

  const createTask = useCallback(async (taskData: TaskFormData) => {
    if (!user) {
      throw new Error('User must be authenticated to create tasks');
    }

    setLoadingState(true);
    setError(null);

    try {
      const newTask: Task = {
        id: generateTaskId(),
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        category: taskData.category,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        tags: taskData.tags,
      };

      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      const appError: AppError = {
        message: error instanceof Error ? error.message : 'Failed to create task',
        code: 'CREATE_TASK_ERROR',
      };
      setError(appError);
      throw appError;
    } finally {
      setLoadingState(false);
    }
  }, [user, setLoadingState, setError]);

  const updateTask = useCallback(async (id: string, taskData: Partial<TaskFormData>) => {
    if (!user) {
      throw new Error('User must be authenticated to update tasks');
    }

    setLoadingState(true);
    setError(null);

    try {
      setTasks(prev => prev.map(task => {
        if (task.id === id && task.userId === user.id) {
          return {
            ...task,
            ...taskData,
            dueDate: taskData.dueDate ? new Date(taskData.dueDate) : task.dueDate,
            updatedAt: new Date(),
          };
        }
        return task;
      }));
    } catch (error) {
      const appError: AppError = {
        message: error instanceof Error ? error.message : 'Failed to update task',
        code: 'UPDATE_TASK_ERROR',
      };
      setError(appError);
      throw appError;
    } finally {
      setLoadingState(false);
    }
  }, [user, setLoadingState, setError]);

  const deleteTask = useCallback(async (id: string) => {
    if (!user) {
      throw new Error('User must be authenticated to delete tasks');
    }

    setLoadingState(true);
    setError(null);

    try {
      setTasks(prev => prev.filter(task => !(task.id === id && task.userId === user.id)));
    } catch (error) {
      const appError: AppError = {
        message: error instanceof Error ? error.message : 'Failed to delete task',
        code: 'DELETE_TASK_ERROR',
      };
      setError(appError);
      throw appError;
    } finally {
      setLoadingState(false);
    }
  }, [user, setLoadingState, setError]);

  const setFilter = useCallback((newFilter: Partial<TaskFilter>) => {
    setFilterState(prev => ({ ...prev, ...newFilter }));
  }, []);

  const refreshTasks = useCallback(async () => {
    if (!user) return;

    setLoadingState(true);
    setError(null);

    try {
      const storedTasks = loadTasksFromStorage();
      const userTasks = storedTasks.filter(task => task.userId === user.id);
      setTasks(userTasks);
    } catch (error) {
      const appError: AppError = {
        message: error instanceof Error ? error.message : 'Failed to refresh tasks',
        code: 'REFRESH_TASKS_ERROR',
      };
      setError(appError);
    } finally {
      setLoadingState(false);
    }
  }, [user, setLoadingState, setError]);

  const value: TaskContextType = {
    tasks,
    filteredTasks,
    filter,
    stats,
    loading,
    createTask,
    updateTask,
    deleteTask,
    setFilter,
    refreshTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
