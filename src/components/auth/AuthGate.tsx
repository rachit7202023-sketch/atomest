import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  children: React.ReactNode | ((props: { isAuthenticated: boolean; onClick: (e?: React.MouseEvent) => void }) => React.ReactNode);
}

export function AuthGate({ children }: Props) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const handleGateClick = (e?: React.MouseEvent) => {
    if (!user) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      // Save current URL so we can return after login
      sessionStorage.setItem('returnTo', window.location.pathname + window.location.search);
      setLocation('/login');
    }
  };

  if (typeof children === 'function') {
    return <>{children({ isAuthenticated: !!user, onClick: handleGateClick })}</>;
  }

  // If standard children, we just intercept clicks via a wrapper if unauthenticated
  if (!user) {
    return (
      <div onClickCapture={handleGateClick} className="cursor-pointer">
        <div className="pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
