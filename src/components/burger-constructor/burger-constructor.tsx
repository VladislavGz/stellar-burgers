import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getNewOrder,
  selectorConstructor
} from '../../services/constructorSlice';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора (done)*/
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getConstructorItems, getConstructorNewOrder } = selectorConstructor;
  const items = useSelector(getConstructorItems);

  const constructorItems = {
    bun: items.bun,
    ingredients: items.ingredients
  };

  const newOrder = useSelector(getConstructorNewOrder);
  console.log(newOrder);

  const orderRequest = newOrder.isOrderRequest;
  
  const orderModalData = newOrder.orderData;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const orderRequestData = constructorItems.ingredients.map(ingredient => ingredient._id);
    orderRequestData.unshift(constructorItems.bun._id);
    
    dispatch(
      getNewOrder(orderRequestData)
    );
  };
  const closeOrderModal = () => {
    navigate(0)
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
