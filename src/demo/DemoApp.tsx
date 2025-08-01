import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DemoAuthProvider } from './DemoAuthContext';
import { DemoTaskProvider } from './DemoTaskProvider';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { Header } from '../components/Header/Header';
import { Home } from '../pages/Home/Home';
import { Dashboard } from '../pages/Dashboard/Dashboard';

export function DemoApp() {
  return (
    <ErrorBoundary>
      <DemoAuthProvider>
        <DemoTaskProvider>
          <Router>
            <div className="app">
              <div className="demo-banner">
                <p>🚀 Demo Mode - No authentication required | Data is stored locally</p>
              </div>
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/demo" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks/new" element={<Dashboard />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </main>
            </div>
          </Router>
        </DemoTaskProvider>
      </DemoAuthProvider>
    </ErrorBoundary>
  );
}
