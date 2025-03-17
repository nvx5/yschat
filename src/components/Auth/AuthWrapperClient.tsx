'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically import AuthWrapper to reduce build memory usage
const AuthWrapper = dynamic(() => import('@/components/Auth/AuthWrapper'), {
  ssr: false,
});

interface AuthWrapperClientProps {
  children: ReactNode;
}

const AuthWrapperClient = ({ children }: AuthWrapperClientProps) => {
  return <AuthWrapper>{children}</AuthWrapper>;
};

export default AuthWrapperClient; 