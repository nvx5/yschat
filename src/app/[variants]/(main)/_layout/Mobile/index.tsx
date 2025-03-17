'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, memo } from 'react';

import { withSuspense } from '@/components/withSuspense';
import { useShowMobileWorkspace } from '@/hooks/useShowMobileWorkspace';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';

const CloudBanner = dynamic(() => import('@/features/AlertBanner/CloudBanner'));

const Layout = memo(({ children }: PropsWithChildren) => {
  const showMobileWorkspace = useShowMobileWorkspace();
  const { showCloudPromotion } = useServerConfigStore(featureFlagsSelectors);

  return (
    <>
      {showCloudPromotion && <CloudBanner mobile />}
      {children}
    </>
  );
});

Layout.displayName = 'MobileMainLayout';

export default withSuspense(Layout);
