import { useState, useEffect } from 'react';
import Landing from '@/pages/Landing';
import AuthPage from '@/components/AuthPage';
import OTPVerification from '@/components/OTPVerification';
import Dashboard from '@/pages/Dashboard';
import { useAuth } from '@/hooks/useAuth';

type AppState = 'landing' | 'auth' | 'otp' | 'dashboard';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState<AppState>('landing');
  const [pendingEmail, setPendingEmail] = useState<string>('');

  // If we have a user, show dashboard
  useEffect(() => {
    if (user && currentPage !== 'dashboard') {
      setCurrentPage('dashboard');
    }
  }, [user, currentPage]);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleGoToAuth = () => {
    setCurrentPage('auth');
  };


  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleAuthSuccess = (email: string, needsVerification: boolean) => {
    if (needsVerification) {
      setPendingEmail(email);
      setCurrentPage('otp');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleOTPVerified = () => {
    setCurrentPage('dashboard');
  };

  const handleBackFromOTP = () => {
    setCurrentPage('auth');
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentPage('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-balance rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-xl font-bold text-white">PI</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'landing') {
    return <Landing onGetStarted={handleGetStarted} onLogin={handleGoToAuth} />;
  }

  if (currentPage === 'auth') {
    return <AuthPage onBack={handleBackToLanding} onAuthSuccess={handleAuthSuccess} />;
  }


  if (currentPage === 'otp') {
    return <OTPVerification email={pendingEmail} onBack={handleBackFromOTP} onVerified={handleOTPVerified} />;
  }

  return <Dashboard onLogout={handleLogout} user={user!} />;
};

export default Index;
