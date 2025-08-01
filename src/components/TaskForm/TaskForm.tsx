import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { taskSchema, type TaskFormData } from '../../utils/validation';
import type { TaskFormProps } from '../../types';
import { Loading } from '../Loading/Loading';
import './TaskForm.css';

export const TaskForm: React.FC<TaskFormProps> = ({ 
  task, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const isEditing = !!task;
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'pending',
      priority: task?.priority || 'medium',
      category: task?.category || '',
      dueDate: task?.dueDate 
        ? new Date(task.dueDate).toISOString().split('T')[0] 
        : null,
      tags: task?.tags || [],
    },
  });

  const watchedTags = watch('tags') || [];
  const [newTag, setNewTag] = React.useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue('tags', [...watchedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onFormSubmit = async (data: TaskFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="task-form-loading">
        <Loading message={isEditing ? 'Updating task...' : 'Creating task...'} />
      </div>
    );
  }

  return (
    <div className="task-form-container">
      <div className="task-form-header">
        <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
        <button 
          type="button" 
          onClick={onCancel}
          className="close-button"
          title="Close"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="task-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            id="title"
            {...register('title')}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Enter task description"
            rows={4}
          />
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className={`form-select ${errors.status ? 'error' : ''}`}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              {...register('priority')}
              className={`form-select ${errors.priority ? 'error' : ''}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category *
            </label>
            <input
              id="category"
              {...register('category')}
              className={`form-input ${errors.category ? 'error' : ''}`}
              placeholder="e.g., Work, Personal, Health"
            />
            {errors.category && (
              <span className="error-message">{errors.category.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              {...register('dueDate')}
              className={`form-input ${errors.dueDate ? 'error' : ''}`}
            />
            {errors.dueDate && (
              <span className="error-message">{errors.dueDate.message}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="tags-input-container">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input tag-input"
              placeholder="Add a tag and press Enter"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="add-tag-button"
              disabled={!newTag.trim()}
            >
              <Plus size={16} />
            </button>
          </div>
          
          {watchedTags.length > 0 && (
            <div className="tags-list">
              {watchedTags.map((tag, index) => (
                <span key={index} className="tag-item">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="remove-tag-button"
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="button button-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button button-primary"
            disabled={isSubmitting}
          >
            <Save size={16} />
            {isSubmitting 
              ? (isEditing ? 'Updating...' : 'Creating...') 
              : (isEditing ? 'Update Task' : 'Create Task')
            }
          </button>
        </div>
      </form>
    </div>
  );
};
