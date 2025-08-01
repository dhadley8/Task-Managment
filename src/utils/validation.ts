import { z } from 'zod';

// Task validation schema
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .default(''),
  status: z.enum(['pending', 'in-progress', 'completed', 'cancelled'] as const)
    .default('pending'),
  priority: z.enum(['low', 'medium', 'high', 'urgent'] as const)
    .default('medium'),
  category: z
    .string()
    .min(1, 'Category is required')
    .max(50, 'Category must be less than 50 characters'),
  dueDate: z
    .string()
    .nullable()
    .refine((date) => {
      if (!date) return true;
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, 'Invalid date format')
    .refine((date) => {
      if (!date) return true;
      const parsedDate = new Date(date);
      return parsedDate >= new Date();
    }, 'Due date must be in the future'),
  tags: z
    .array(z.string().max(30, 'Tag must be less than 30 characters'))
    .max(10, 'Maximum 10 tags allowed')
    .default([]),
});

// Task filter schema
export const taskFilterSchema = z.object({
  status: z.array(z.enum(['pending', 'in-progress', 'completed', 'cancelled'] as const)).optional(),
  priority: z.array(z.enum(['low', 'medium', 'high', 'urgent'] as const)).optional(),
  category: z.array(z.string()).optional(),
  searchTerm: z.string().optional(),
  sortBy: z.enum(['title', 'dueDate', 'createdAt', 'priority']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// User profile update schema
export const userProfileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Invalid email format'),
});

// Export types inferred from schemas
export type TaskFormData = z.infer<typeof taskSchema>;
export type TaskFilterData = z.infer<typeof taskFilterSchema>;
export type UserProfileData = z.infer<typeof userProfileSchema>;

// Validation helper functions
export const validateTask = (data: unknown) => {
  return taskSchema.safeParse(data);
};

export const validateTaskFilter = (data: unknown) => {
  return taskFilterSchema.safeParse(data);
};

export const validateUserProfile = (data: unknown) => {
  return userProfileSchema.safeParse(data);
};
