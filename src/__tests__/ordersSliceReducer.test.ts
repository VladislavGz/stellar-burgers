import { RequestStatus, TOrder } from '@utils-types';
import {
  ordersSlice,
  initialState,
  getOrders
} from '../../src/services/ordersSlice';

const mockOrders: TOrder[] = [
  {
    _id: 'order_1',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: ['1', '1']
  },

  {
    _id: 'order_2',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: ['1', '1']
  }
];

describe('ordersSlice reducer', () => {
  test('initialization correct', () => {
    const state = ordersSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('getOrders pending', () => {
    const action = { type: getOrders.pending.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  test('getOrders fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.orders).toEqual(mockOrders);
  });

  test('getOrders rejected', () => {
    const action = { type: getOrders.rejected.type };
    const state = ordersSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });
});
