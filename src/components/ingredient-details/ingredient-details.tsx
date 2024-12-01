import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { selectorIngredients } from '../../services/ingredientsSlice';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора (done)*/
  const ingredientId = useParams().id;
  const { selectorIngredientsData } = selectorIngredients;
  const ingredients = useSelector(selectorIngredientsData);
  const ingredientData =
    ingredients[ingredients.findIndex((item) => item._id === ingredientId)];

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
