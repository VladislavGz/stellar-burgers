import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getNewOrder,
  selectorConstructor
} from '../../services/constructorSlice';
import { useSelector } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { selectorUser } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора (done)*/
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getConstructorItems, getConstructorNewOrder } = selectorConstructor;
  const { selectorIsAuthChecked, selectorUserData } = selectorUser;
  const items = useSelector(getConstructorItems);

  const constructorItems = {
    bun: items.bun,
    ingredients: items.ingredients
  };

  const newOrder = useSelector(getConstructorNewOrder);

  const orderRequest = newOrder.isOrderRequest;

  const orderModalData = newOrder.orderData;

  const isAuthChecked = useSelector(selectorIsAuthChecked);
  const userData = useSelector(selectorUserData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const orderRequestData = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    orderRequestData.unshift(constructorItems.bun._id);
    orderRequestData.push(constructorItems.bun._id);

    //проверка авторизации
    if (isAuthChecked && !userData) {
      navigate('/login');
      return;
    }

    dispatch(getNewOrder(orderRequestData));
  };
  const closeOrderModal = () => {
    navigate(0);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
