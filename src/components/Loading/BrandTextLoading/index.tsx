import { BrandLoading } from '@lobehub/ui/brand';
import { FC } from 'react';
import { Center } from 'react-layout-kit';

import { isCustomBranding } from '@/const/version';

import CircleLoading from '../CircleLoading';

// Create an empty text component that matches the expected type
const EmptyText: FC<any> = () => null;

export default () => {
  if (isCustomBranding) return <CircleLoading />;

  return (
    <Center height={'100%'} width={'100%'}>
      <BrandLoading size={40} style={{ opacity: 0.6 }} text={EmptyText} />
    </Center>
  );
};
