import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TConstructorIngredient, TOrder } from '@utils-types';

export type TConstructorState = {
  items: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  order: {
    orderData: TOrder | null;
    isOrderRequest: boolean;
    requestStatus: RequestStatus;
  };
};

export const initialState: TConstructorState = {
  items: {
    bun: null,
    ingredients: []
  },
  order: {
    orderData: null,
    isOrderRequest: false,
    requestStatus: RequestStatus.Idle
  }
};

export const getNewOrder = createAsyncThunk(
  'newOrder/getNewOrder',
  orderBurgerApi
);

export const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = { ...action.payload, id: action.payload._id };
      if (newItem.type === 'bun') {
        state.items.bun = newItem;
      } else {
        const collision = state.items.ingredients.find(
          (ingredient) => ingredient._id === newItem.id
        );
        if (!collision) state.items.ingredients.push(newItem);
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
  extraReducers: (builder) => {
    builder
      .addCase(getNewOrder.pending, (state) => {
        state.order.isOrderRequest = true;
        state.order.requestStatus = RequestStatus.Loading;
      })
      .addCase(getNewOrder.fulfilled, (state, action) => {
        state.order.isOrderRequest = true;
        state.order.requestStatus = RequestStatus.Success;
        state.order.orderData = action.payload.order;
      })
      .addCase(getNewOrder.rejected, (state) => {
        state.order.isOrderRequest = true;
        state.order.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    getConstructorItems: (state: TConstructorState) => state.items,
    getConstructorNewOrder: (state: TConstructorState) => state.order
  }
});

export const constructorActions = constructorSlice.actions;
export const selectorConstructor = constructorSlice.selectors;