import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/pages/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Mock authentication - any credentials work
    setUser({ username });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} user={user!} />;
};

export default Index;
