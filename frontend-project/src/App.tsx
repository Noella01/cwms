import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Cars } from './pages/Cars';
import { Services } from './pages/Services';
import ServiceRecords from './pages/ServiceRecords';
import { Payments } from './pages/Payments';
import { Reports } from './pages/Reports';
interface User {
  name: string;
  role: string;
}
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser({
      name: 'Chief Mechanic',
      role: 'Administrator'
    });
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
  };
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }
  return <BrowserRouter>
      <Layout onLogout={handleLogout} user={user}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/services" element={<Services />} />
          <Route path="/records" element={<ServiceRecords />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>;
}