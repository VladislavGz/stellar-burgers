import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { constructorSlice } from './constructorSlice';
import { feedSlice } from './feedSlice';
import { userSlice } from './userSlice';
import { ordersSlice } from './ordersSlice';
import { orderSlice } from './orderSlice';

// Заменить на импорт настоящего редьюсера
const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
