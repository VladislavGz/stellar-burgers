import { ProfileOrdersUI } from '@ui-pages';
import { RequestStatus, TOrder } from '@utils-types';
import { FC } from 'react';
import { getOrders, selectorOrders } from '../../services/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { getOrdersInfo, selectorRequestStatus } = selectorOrders;

  /** TODO: взять переменную из стора (done)*/
  const orders: TOrder[] = useSelector(getOrdersInfo);

  const requestStatus = useSelector(selectorRequestStatus);
  if (requestStatus === RequestStatus.Idle) {
    dispatch(getOrders());
  }

  return <ProfileOrdersUI orders={orders} />;
};
