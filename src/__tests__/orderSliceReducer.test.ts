import { RequestStatus, TOrder } from '@utils-types';
import {
  orderSlice,
  initialState,
  getOrderByNumber
} from '../../src/services/orderSlice';

const mockOrders: TOrder[] = [
  {
    _id: 'order_1',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: ['1', '1']
  }
];

describe('orderSlice reducer', () => {
  test('initialization correct', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('getOrderByNumber pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  test('getOrderByNumber fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: {
        orders: mockOrders
      }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.order).toEqual(mockOrders);
  });

  test('getOrderByNumber rejected', () => {
    const action = { type: getOrderByNumber.rejected.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });
});
