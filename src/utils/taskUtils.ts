import type { Task, TaskFilter, TaskStats, TaskStatus, TaskPriority } from '../types';
import { format, isAfter, isBefore, isToday } from 'date-fns';

// Task utility functions
export const generateTaskId = (): string => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const sortTasks = (tasks: Task[], sortBy: string, sortOrder: 'asc' | 'desc' = 'asc'): Task[] => {
  const sorted = [...tasks].sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'dueDate':
        aValue = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
        bValue = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      case 'priority': {
        const priorityOrder = { low: 1, medium: 2, high: 3, urgent: 4 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
        break;
      }
      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  return tasks.filter((task) => {
    // Filter by status
    if (filter.status && filter.status.length > 0) {
      if (!filter.status.includes(task.status)) return false;
    }

    // Filter by priority
    if (filter.priority && filter.priority.length > 0) {
      if (!filter.priority.includes(task.priority)) return false;
    }

    // Filter by category
    if (filter.category && filter.category.length > 0) {
      if (!filter.category.includes(task.category)) return false;
    }

    // Filter by search term
    if (filter.searchTerm && filter.searchTerm.trim()) {
      const searchLower = filter.searchTerm.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(searchLower);
      const matchesDescription = task.description.toLowerCase().includes(searchLower);
      const matchesTags = task.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!matchesTitle && !matchesDescription && !matchesTags) return false;
    }

    return true;
  });
};

export const calculateTaskStats = (tasks: Task[]): TaskStats => {
  const stats: TaskStats = {
    total: tasks.length,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  };

  const now = new Date();

  tasks.forEach((task) => {
    switch (task.status) {
      case 'pending':
        stats.pending++;
        break;
      case 'in-progress':
        stats.inProgress++;
        break;
      case 'completed':
        stats.completed++;
        break;
    }

    // Check if task is overdue
    if (task.dueDate && task.status !== 'completed' && isAfter(now, new Date(task.dueDate))) {
      stats.overdue++;
    }
  });

  return stats;
};

export const isTaskOverdue = (task: Task): boolean => {
  if (!task.dueDate || task.status === 'completed') return false;
  return isAfter(new Date(), new Date(task.dueDate));
};

export const formatTaskDueDate = (dueDate: Date | null): string => {
  if (!dueDate) return 'No due date';
  
  const date = new Date(dueDate);
  const now = new Date();
  
  if (isToday(date)) return 'Today';
  if (isBefore(date, now)) return `Overdue (${format(date, 'MMM dd')})`;
  
  return format(date, 'MMM dd, yyyy');
};

export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'low':
      return '#10b981'; // green
    case 'medium':
      return '#f59e0b'; // yellow
    case 'high':
      return '#f97316'; // orange
    case 'urgent':
      return '#ef4444'; // red
    default:
      return '#6b7280'; // gray
  }
};

export const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'pending':
      return '#6b7280'; // gray
    case 'in-progress':
      return '#3b82f6'; // blue
    case 'completed':
      return '#10b981'; // green
    case 'cancelled':
      return '#ef4444'; // red
    default:
      return '#6b7280'; // gray
  }
};

export const getUniqueCategories = (tasks: Task[]): string[] => {
  const categories = tasks.map(task => task.category);
  return Array.from(new Set(categories)).sort();
};

export const getUniqueTags = (tasks: Task[]): string[] => {
  const tags = tasks.flatMap(task => task.tags);
  return Array.from(new Set(tags)).sort();
};

// Local storage utilities
export const STORAGE_KEYS = {
  TASKS: 'task_management_tasks',
  USER_PREFERENCES: 'task_management_preferences',
} as const;

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to storage:', error);
  }
};

export const loadTasksFromStorage = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!stored) return [];
    
    const tasks = JSON.parse(stored);
    // Convert date strings back to Date objects
    return tasks.map((task: Task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    }));
  } catch (error) {
    console.error('Failed to load tasks from storage:', error);
    return [];
  }
};

export const clearTaskStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
  } catch (error) {
    console.error('Failed to clear task storage:', error);
  }
};
