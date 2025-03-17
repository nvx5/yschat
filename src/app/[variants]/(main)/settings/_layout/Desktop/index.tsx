'use client';

import { ActionIcon } from '@lobehub/ui';
import { Tag } from 'antd';
import { useResponsive } from 'antd-style';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import InitClientDB from '@/features/InitClientDB';
import Footer from '@/features/Setting/Footer';
import SettingContainer from '@/features/Setting/SettingContainer';
import { useActiveSettingsKey } from '@/hooks/useActiveTabKey';
import { SettingsTabs } from '@/store/global/initialState';

import { LayoutProps } from '../type';
import Header from './Header';
import SideBar from './SideBar';

const Layout = memo<LayoutProps>(({ children, category }) => {
  const ref = useRef<any>(null);
  const { md = true } = useResponsive();
  const { t } = useTranslation('setting');
  const activeKey = useActiveSettingsKey();
  const router = useRouter();

  return (
    <Flexbox
      height={'100%'}
      horizontal={md}
      ref={ref}
      style={{ position: 'relative' }}
      width={'100%'}
    >
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

      {md ? (
        <SideBar>{category}</SideBar>
      ) : (
        <Header
          getContainer={() => ref.current}
          title={
            <>
              {t(`tab.${activeKey}`)}
              {activeKey === SettingsTabs.Sync && <Tag color={'gold'}>{t('tab.experiment')}</Tag>}
            </>
          }
        >
          {category}
        </Header>
      )}
      <SettingContainer addonAfter={<Footer />}>{children}</SettingContainer>
      <InitClientDB />
    </Flexbox>
  );
});

Layout.displayName = 'DesktopSettingsLayout';

export default Layout;
