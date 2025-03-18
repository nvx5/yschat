'use client';

import { ActionIcon } from '@lobehub/ui';
import { MobileNavBar } from '@lobehub/ui/mobile';
import { MessageSquarePlus, Settings, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { MOBILE_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import SyncStatusInspector from '@/features/SyncStatusInspector';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';
import { mobileHeaderSticky } from '@/styles/mobileHeader';

const Header = memo(() => {
  const [createSession] = useSessionStore((s) => [s.createSession]);
  const router = useRouter();
  const { enableWebrtc, showCreateSession, showMarket } = useServerConfigStore(featureFlagsSelectors);

  return (
    <MobileNavBar
      left={
        <Flexbox align={'center'} gap={8} horizontal style={{ marginLeft: 8 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}></div>
          {enableWebrtc && <SyncStatusInspector placement={'bottom'} />}
        </Flexbox>
      }
      right={
        <Flexbox gap={8} horizontal>
          {showMarket && (
            <ActionIcon
              icon={Compass}
              onClick={() => router.push('/discover')}
              size={MOBILE_HEADER_ICON_SIZE}
            />
          )}
          <ActionIcon
            icon={Settings}
            onClick={() => router.push('/settings')}
            size={MOBILE_HEADER_ICON_SIZE}
          />
          {showCreateSession && (
            <ActionIcon
              icon={MessageSquarePlus}
              onClick={() => createSession()}
              size={MOBILE_HEADER_ICON_SIZE}
            />
          )}
        </Flexbox>
      }
      style={mobileHeaderSticky}
    />
  );
});

export default Header;
