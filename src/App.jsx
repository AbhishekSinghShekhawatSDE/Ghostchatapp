import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/designTokens.css';

const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PrivacyPolicy = lazy(() => import('./legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./legal/TermsOfService'));
const Copyright = lazy(() => import('./legal/Copyright'));
const Disclaimer = lazy(() => import('./legal/Disclaimer'));

// Modern Loading Fallback
const LoadingScreen = () => (
  <div style={{
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'var(--bg-surface)'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid var(--fds-blue-20)',
      borderTop: '3px solid var(--fds-blue-60)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>
      {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/copyright" element={<Copyright />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
