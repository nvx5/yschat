'use client';

import { Flexbox } from 'react-layout-kit';
import { ProviderCombine } from '@lobehub/icons';

import { AimlProviderCard } from '@/config/modelProviders';
import { ProviderItem } from '../../type';

export const useAimlProvider = (): ProviderItem => {
  return {
    ...AimlProviderCard,
    title: (
      <Flexbox align={'center'} gap={8} horizontal>
        <ProviderCombine provider="aiml" size={24} />
        AI/ML API
      </Flexbox>
    ),
  };
}; 