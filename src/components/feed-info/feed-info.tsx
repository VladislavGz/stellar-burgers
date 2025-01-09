import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { selectorFeed } from '../../services/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { getFeedInfo } = selectorFeed;

  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(getFeedInfo);
  const feed = {
    total: orders.length,
    totalToday: orders.filter(order => new Date(order.createdAt).toDateString() === new Date().toDateString()).length
  }

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
