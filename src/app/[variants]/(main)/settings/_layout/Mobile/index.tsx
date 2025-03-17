'use client';

import { ActionIcon } from '@lobehub/ui';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

import MobileContentLayout from '@/components/server/MobileNavLayout';
import InitClientDB from '@/features/InitClientDB';
import Footer from '@/features/Setting/Footer';

import { LayoutProps } from '../type';
import Header from './Header';

const Layout = memo(({ children }: LayoutProps) => {
  const router = useRouter();
  
  return (
    <>
      {/* Fixed position close button at top right of screen */}
      <div style={{ 
        position: 'fixed', 
        top: '16px', 
        right: '16px', 
        zIndex: 1000 
      }}>
        <ActionIcon
          icon={X}
          onClick={() => router.push('/chat')}
          size={{ blockSize: 36, fontSize: 20 }}
          title="Close"
        />
      </div>
      
      <MobileContentLayout header={<Header />}>
        {children}
        <Footer />
        <InitClientDB />
      </MobileContentLayout>
    </>
  );
});

Layout.displayName = 'MobileSettingsLayout';

export default Layout;
