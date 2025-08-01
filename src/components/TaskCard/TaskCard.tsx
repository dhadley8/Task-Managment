import React from 'react';
import { Calendar, Tag, Clock, Edit, Trash2 } from 'lucide-react';
import type { TaskCardProps, TaskStatus } from '../../types';
import { formatTaskDueDate, getPriorityColor, getStatusColor, isTaskOverdue } from '../../utils/taskUtils';
import './TaskCard.css';

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const priorityColor = getPriorityColor(task.priority);
  const statusColor = getStatusColor(task.status);
  const overdue = isTaskOverdue(task);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as TaskStatus);
  };

  return (
    <div className={`task-card ${overdue ? 'overdue' : ''}`}>
      <div className="task-card-header">
        <div className="task-priority" style={{ backgroundColor: priorityColor }}>
          {task.priority}
        </div>
        <div className="task-actions">
          <button
            className="task-action-btn edit"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            <Edit size={16} />
          </button>
          <button
            className="task-action-btn delete"
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="task-card-body">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-metadata">
          <div className="task-category">
            <Tag size={14} />
            <span>{task.category}</span>
          </div>

          {task.dueDate && (
            <div className={`task-due-date ${overdue ? 'overdue' : ''}`}>
              <Calendar size={14} />
              <span>{formatTaskDueDate(task.dueDate)}</span>
            </div>
          )}

          <div className="task-created">
            <Clock size={14} />
            <span>Created {task.createdAt.toLocaleDateString()}</span>
          </div>
        </div>

        {task.tags.length > 0 && (
          <div className="task-tags">
            {task.tags.map((tag, index) => (
              <span key={index} className="task-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="task-status-section">
          <label htmlFor={`status-${task.id}`} className="status-label">
            Status:
          </label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={handleStatusChange}
            className="status-select"
            style={{ borderColor: statusColor }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};
