'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { PinEntry } from './PinEntry';

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem('chatAuth');
      setIsAuthenticated(auth === 'true');
      setIsLoading(false);
    };

    // Check auth on mount
    checkAuth();

    // Also check when storage changes (in case another tab authenticates)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Skip auth for certain paths
  const isPublicPath = pathname?.includes('/next-auth') || 
                      pathname?.includes('/api') || 
                      pathname?.includes('/trpc') ||
                      pathname?.includes('/webapi');

  if (isLoading) {
    return null; // Show nothing while checking auth
  }

  if (!isAuthenticated && !isPublicPath) {
    return <PinEntry onSuccess={() => setIsAuthenticated(true)} />;
  }

  // Return children directly without a fragment since there's only one child
  return children;
}; 