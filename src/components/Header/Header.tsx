import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User, Plus, BarChart3 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <BarChart3 size={24} />
            Task Manager
          </Link>
          
          {isAuthenticated && (
            <nav className="nav-links">
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/tasks/new" 
                className={`nav-link ${isActive('/tasks/new') ? 'active' : ''}`}
              >
                <Plus size={16} />
                New Task
              </Link>
            </nav>
          )}
        </div>

        <div className="header-right">
          {isAuthenticated && user ? (
            <div className="user-menu">
              <div className="user-info">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    <User size={20} />
                  </div>
                )}
                <span className="user-name">{user.name}</span>
              </div>
              <button 
                onClick={logout}
                className="logout-button"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-section">
              <span className="welcome-text">Welcome to Task Manager</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
