import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Header } from './components/Header/Header';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Home } from './pages/Home/Home';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { DemoApp } from './demo/DemoApp';
import './App.css';

// Auth0 configuration - Replace with your Auth0 domain and client ID
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;

// Check if Auth0 is configured
const isAuth0Configured = AUTH0_DOMAIN && 
  AUTH0_CLIENT_ID && 
  AUTH0_DOMAIN !== 'your-domain.auth0.com' && 
  AUTH0_CLIENT_ID !== 'your-client-id';

function App() {
  // Check if we're in demo mode
  const isDemoMode = window.location.pathname.startsWith('/demo') || 
                    window.location.search.includes('demo=true');
  
  // If demo mode is requested, use DemoApp
  if (isDemoMode) {
    return <DemoApp />;
  }

  // If Auth0 is not configured, show configuration instructions
  if (!isAuth0Configured) {
    return (
      <div className="app">
        <div className="config-required">
          <div className="config-content">
            <h1>🔧 Configuration Required</h1>
            <p>To use this Task Management Application, you need to configure Auth0 authentication.</p>
            
            <div className="config-steps">
              <h2>Setup Instructions:</h2>
              <ol>
                <li>
                  <strong>Create an Auth0 account</strong> at{' '}
                  <a href="https://auth0.com" target="_blank" rel="noopener noreferrer">
                    auth0.com
                  </a>
                </li>
                <li>
                  <strong>Create a new Single Page Application</strong> in your Auth0 dashboard
                </li>
                <li>
                  <strong>Configure the allowed URLs:</strong>
                  <ul>
                    <li>Allowed Callback URLs: <code>http://localhost:5173</code></li>
                    <li>Allowed Logout URLs: <code>http://localhost:5173</code></li>
                    <li>Allowed Web Origins: <code>http://localhost:5173</code></li>
                  </ul>
                </li>
                <li>
                  <strong>Create a <code>.env</code> file</strong> in the project root with:
                  <pre>
{`VITE_AUTH0_DOMAIN=your-actual-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-actual-client-id`}
                  </pre>
                </li>
                <li>
                  <strong>Restart the development server</strong> after creating the .env file
                </li>
              </ol>
            </div>
            
            <div className="demo-mode">
              <h3>Demo Mode (Without Authentication)</h3>
              <p>You can also explore the app without authentication by clicking below:</p>
              <button 
                className="demo-button"
                onClick={() => window.location.href = '/demo'}
              >
                🚀 Try Demo Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <ErrorBoundary>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <AuthProvider>
          <TaskProvider>
            <Router>
              <div className="app">
                <Header />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/tasks/new" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </TaskProvider>
        </AuthProvider>
      </Auth0Provider>
    </ErrorBoundary>
  );
}

export default App;
