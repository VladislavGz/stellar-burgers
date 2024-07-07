import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  items: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = { ...action.payload, id: action.payload._id };
      if (newItem.type === 'bun') {
        state.items.bun = newItem;
      } else {
        state.items.ingredients.push(newItem);
      }
    },
    removeItem: (state, action) => {
      state.items.ingredients = state.items.ingredients.filter(
        (item) => item._id !== action.payload.id
      );
    },
    moveUp: (state, action) => {
      const index = action.payload;
      [state.items.ingredients[index], state.items.ingredients[index - 1]] = [
        state.items.ingredients[index - 1],
        state.items.ingredients[index]
      ];
    },
    moveDown: (state, action) => {
      const index = action.payload;
      [state.items.ingredients[index], state.items.ingredients[index + 1]] = [
        state.items.ingredients[index + 1],
        state.items.ingredients[index]
      ];
    }
  },
  selectors: {
    getConstructorItems: (state: TConstructorState) => state.items
  }
});

export const constructorActions = constructorSlice.actions;
export const selectorConstructor = constructorSlice.selectors;
