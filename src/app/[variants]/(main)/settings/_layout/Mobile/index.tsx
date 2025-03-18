'use client';

import { memo } from 'react';

import MobileContentLayout from '@/components/server/MobileNavLayout';
import InitClientDB from '@/features/InitClientDB';
import Footer from '@/features/Setting/Footer';

import { LayoutProps } from '../type';
import Header from './Header';

const Layout = memo(({ children }: LayoutProps) => {
  return (
    <MobileContentLayout header={<Header />}>
      {children}
      <Footer />
      <InitClientDB />
    </MobileContentLayout>
  );
});

Layout.displayName = 'MobileSettingsLayout';

export default Layout;
