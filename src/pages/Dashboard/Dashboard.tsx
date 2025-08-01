import React, { useState } from 'react';
import { Plus, Search, Filter, BarChart3 } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import { TaskForm } from '../../components/TaskForm/TaskForm';
import { Loading } from '../../components/Loading/Loading';
import type { Task, TaskStatus, TaskFormData } from '../../types';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { 
    filteredTasks, 
    stats, 
    loading, 
    createTask, 
    updateTask, 
    deleteTask, 
    setFilter,
    filter 
  } = useTasks();
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState(filter.searchTerm || '');
  const [statusFilter, setStatusFilter] = useState<TaskStatus[]>(filter.status || []);

  const handleCreateTask = async (taskData: TaskFormData) => {
    await createTask(taskData);
    setShowTaskForm(false);
  };

  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    await updateTask(taskId, { status });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilter({ searchTerm: value });
  };

  const handleStatusFilterChange = (status: TaskStatus) => {
    const newStatusFilter = statusFilter.includes(status)
      ? statusFilter.filter(s => s !== status)
      : [...statusFilter, status];
    
    setStatusFilter(newStatusFilter);
    setFilter({ status: newStatusFilter.length > 0 ? newStatusFilter : undefined });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter([]);
    setFilter({ searchTerm: undefined, status: undefined });
  };

  if (loading.isLoading && filteredTasks.length === 0) {
    return <Loading message="Loading your tasks..." />;
  }

  if (showTaskForm || editingTask) {
    return (
      <div className="dashboard-overlay">
        <TaskForm
          task={editingTask || undefined}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          isLoading={loading.isLoading}
        />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">
            <BarChart3 size={28} />
            Task Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Manage and track your tasks efficiently
          </p>
        </div>
        
        <button
          className="create-task-button"
          onClick={() => setShowTaskForm(true)}
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card in-progress">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        {stats.overdue > 0 && (
          <div className="stat-card overdue">
            <div className="stat-number">{stats.overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        )}
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-container">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <Filter size={16} />
          <span className="filter-label">Status:</span>
          <div className="status-filters">
            {(['pending', 'in-progress', 'completed', 'cancelled'] as TaskStatus[]).map(status => (
              <label key={status} className="status-filter">
                <input
                  type="checkbox"
                  checked={statusFilter.includes(status)}
                  onChange={() => handleStatusFilterChange(status)}
                />
                <span className="status-filter-label">
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
          
          {(searchTerm || statusFilter.length > 0) && (
            <button onClick={clearFilters} className="clear-filters-button">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="tasks-section">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <h3>No tasks found</h3>
              <p>
                {filter.searchTerm || filter.status?.length ? 
                  'Try adjusting your filters or search terms.' : 
                  'Get started by creating your first task.'
                }
              </p>
              <button
                className="create-first-task-button"
                onClick={() => setShowTaskForm(true)}
              >
                <Plus size={20} />
                Create Task
              </button>
            </div>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      {loading.error && (
        <div className="error-banner">
          <p>Error: {loading.error.message}</p>
        </div>
      )}
    </div>
  );
};
