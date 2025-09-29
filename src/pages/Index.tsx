import { useState } from 'react';
import Landing from '@/pages/Landing';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/pages/Dashboard';

type AppState = 'landing' | 'login' | 'dashboard';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('landing');
  const [user, setUser] = useState<{ username: string } | null>(null);

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  const handleLogin = (username: string, password: string) => {
    // Mock authentication - any credentials work
    setUser({ username });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  if (currentPage === 'landing') {
    return <Landing onGetStarted={handleGetStarted} onLogin={handleGoToLogin} />;
  }

  if (currentPage === 'login') {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} user={user!} />;
};

export default Index;
