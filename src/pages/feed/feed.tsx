import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getFeeds, selectorFeed } from '../../services/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { getFeedInfo } = selectorFeed;

  /** TODO: взять переменную из стора (done)*/
  const orders: TOrder[] = useSelector(getFeedInfo);

  if (!orders.length) {
    dispatch(getFeeds());
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
