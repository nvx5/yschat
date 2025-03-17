'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import PinEntry to reduce initial build size
const PinEntry = dynamic(() => import('./PinEntry'), {
  ssr: false,
  loading: () => null
});

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Check if the path should skip authentication
  const isPublicPath = !!pathname && (
    pathname.includes('/next-auth') || 
    pathname.includes('/api') || 
    pathname.includes('/trpc') ||
    pathname.includes('/webapi')
  );

  // Skip auth check entirely for public paths
  if (isPublicPath) {
    return <>{children}</>;
  }

  // Check if the user is already authenticated
  useEffect(() => {
    // Simple auth check function
    const auth = sessionStorage?.getItem('chatAuth') === 'true';
    setIsAuthenticated(auth);
    setIsLoading(false);

    // Window storage event to sync auth state across tabs
    const handleStorageChange = () => {
      setIsAuthenticated(sessionStorage?.getItem('chatAuth') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <PinEntry onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <>{children}</>;
};

// Add default export for dynamic importing
export default AuthWrapper; 