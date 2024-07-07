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
    }
  },
  selectors: {
    getConstructorItems: (state: TConstructorState) => state.items
  }
});

export const constructorActions = constructorSlice.actions;
export const selectorConstructor = constructorSlice.selectors;
