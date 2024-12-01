import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useState } from 'react';
import store from '../../services/store';
import { selectorIngredients } from '../../services/ingredientsSlice';
import { RequestStatus } from '@utils-types';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора (done)*/
  const { selectorIngredientsStatus } = selectorIngredients;
  const isIngredientsLoading =
    useSelector(selectorIngredientsStatus) !== RequestStatus.Success;

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
