import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, BarChart3, Users, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Home.css';

export const Home: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      login();
    }
  };

  const features = [
    {
      icon: <CheckCircle size={24} />,
      title: 'Task Management',
      description: 'Create, edit, and organize your tasks with ease. Set priorities, due dates, and categories.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Progress Tracking',
      description: 'Track your progress with visual indicators and status updates. Never miss a deadline.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analytics Dashboard',
      description: 'Get insights into your productivity with comprehensive stats and visualizations.'
    },
    {
      icon: <Users size={24} />,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for productivity. Clean, modern, and responsive design.'
    }
  ];

  const benefits = [
    'Secure authentication with Auth0',
    'Real-time task synchronization',
    'Mobile-responsive design',
    'TypeScript powered for reliability',
    'Advanced filtering and search',
    'Data persistence and backup'
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Manage Your Tasks
              <span className="hero-highlight"> Efficiently</span>
            </h1>
            <p className="hero-description">
              A powerful, TypeScript-based task management application built with React. 
              Organize your work, track progress, and boost productivity with our intuitive interface.
            </p>
            <div className="hero-actions">
              <button 
                className="cta-button primary"
                onClick={handleGetStarted}
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRight size={20} />
              </button>
              {!isAuthenticated && (
                <button 
                  className="cta-button secondary"
                  onClick={login}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-title">Sample Task</div>
                <div className="hero-card-priority high">High</div>
              </div>
              <div className="hero-card-body">
                <h3>Complete project proposal</h3>
                <p>Finalize the client presentation and submit by Friday</p>
                <div className="hero-card-meta">
                  <span className="hero-card-category">Work</span>
                  <span className="hero-card-due">Due: Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-content">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-description">
              Everything you need to stay organized and productive
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2 className="section-title">Why Choose Our Task Manager?</h2>
            <p className="section-description">
              Built with modern technologies and best practices to ensure reliability, 
              security, and excellent user experience.
            </p>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <Star size={16} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <button 
              className="cta-button primary"
              onClick={handleGetStarted}
            >
              Start Managing Tasks
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="benefits-visual">
            <div className="stats-preview">
              <div className="stat-preview-item">
                <div className="stat-preview-number">24</div>
                <div className="stat-preview-label">Total Tasks</div>
              </div>
              <div className="stat-preview-item">
                <div className="stat-preview-number">8</div>
                <div className="stat-preview-label">In Progress</div>
              </div>
              <div className="stat-preview-item">
                <div className="stat-preview-number">16</div>
                <div className="stat-preview-label">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Organized?</h2>
          <p className="cta-description">
            Join thousands of users who have improved their productivity with our task management solution.
          </p>
          <button 
            className="cta-button primary large"
            onClick={handleGetStarted}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
            <ArrowRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
};
