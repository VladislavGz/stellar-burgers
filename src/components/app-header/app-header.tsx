import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectorUser } from '../../services/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { selectorUserData } = selectorUser;
  const userName: string = useSelector(selectorUserData)?.name || '';

  return <AppHeaderUI userName={userName} />;
};
