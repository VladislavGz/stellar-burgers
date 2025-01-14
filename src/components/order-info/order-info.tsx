import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { selectorIngredients } from '../../services/ingredientsSlice';
import { getOrderByNumber, selectorOrder } from '../../services/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const { getOrderInfo } = selectorOrder;
  const { selectorIngredientsData } = selectorIngredients;

  const orders: TOrder[] = useSelector(getOrderInfo);
  
  const num = Number(number);
  if (!orders.length || orders[0].number !== num) {
    dispatch(getOrderByNumber(num));
  }

  const orderData = orders.find((order) => order.number.toString() === number);

  const ingredients: TIngredient[] = useSelector(selectorIngredientsData);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
