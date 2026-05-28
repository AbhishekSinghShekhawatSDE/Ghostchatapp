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

function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}>
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
