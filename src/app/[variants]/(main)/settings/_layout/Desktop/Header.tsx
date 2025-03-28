'use client';

import { ActionIcon, ChatHeader, ChatHeaderTitle } from '@lobehub/ui';
import { Drawer, type DrawerProps } from 'antd';
import { createStyles } from 'antd-style';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import BrandWatermark from '@/components/BrandWatermark';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    position: relative;
    flex: none;
    height: 54px;
    background: ${token.colorBgContainer};
  `,
  title: css`
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
  `,
}));

interface HeaderProps extends Pick<DrawerProps, 'getContainer'> {
  children: ReactNode;
  title: ReactNode;
}

const Header = memo<HeaderProps>(({ children, getContainer, title }) => {
  const [open, setOpen] = useState(false);
  const { styles, theme } = useStyles();
  const router = useRouter();

  return (
    <>
      <ChatHeader
        className={styles.container}
        left={
          <ChatHeaderTitle
            title={
              <Flexbox align={'center'} className={styles.title} gap={4} horizontal>
                <ActionIcon
                  color={theme.colorText}
                  icon={Menu}
                  onClick={() => setOpen(true)}
                  size={{ blockSize: 32, fontSize: 18 }}
                />
                {title}
              </Flexbox>
            }
          />
        }
        right={
          <ActionIcon
            color={theme.colorText}
            icon={X}
            onClick={() => router.push('/chat')}
            size={{ blockSize: 32, fontSize: 18 }}
            title="Close"
          />
        }
      />
      <Drawer
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          justifyContent: 'space-between',
          padding: 16,
        }}
        getContainer={getContainer}
        headerStyle={{ display: 'none' }}
        maskStyle={{ background: 'transparent' }}
        onClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        open={open}
        placement={'left'}
        rootStyle={{ position: 'absolute' }}
        style={{
          background: theme.colorBgContainer,
          borderRight: `1px solid ${theme.colorSplit}`,
        }}
        width={260}
        zIndex={10}
      >
        {children}
        <BrandWatermark paddingInline={12} />
      </Drawer>
    </>
  );
});

export default Header;
