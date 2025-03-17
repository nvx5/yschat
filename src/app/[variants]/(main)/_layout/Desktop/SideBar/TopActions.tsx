import { memo } from 'react';

export interface TopActionProps {
  isPinned?: boolean | null;
  tab?: string;
}

const TopActions = memo<TopActionProps>(() => {
  return null;
});

export default TopActions;
