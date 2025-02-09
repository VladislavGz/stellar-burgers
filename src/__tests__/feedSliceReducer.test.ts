import { RequestStatus, TOrder } from "@utils-types";
import { feedSlice, initialState, getFeeds } from "../../src/services/feedSlice";

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

describe('feedSlice reducer', () => {
    test('initialization correct', () => {
        const state = feedSlice.reducer(undefined, { type: '' });
        expect(state).toEqual(initialState);
    });

    test('getFeeds pending', () => {
        const action = { type: getFeeds.pending.type };
        const state = feedSlice.reducer(initialState, action);
        expect(state.requestStatus).toBe(RequestStatus.Loading);
    });

    test('getFeeds fulfilled', () => {
        const action = {
            type: getFeeds.fulfilled.type, payload: {
                orders: mockOrders
            }
        };
        const state = feedSlice.reducer(initialState, action);
        expect(state.requestStatus).toBe(RequestStatus.Success);
        expect(state.orders).toEqual(mockOrders);
    });

    test('getFeeds rejected', () => {
        const action = { type: getFeeds.rejected.type };
        const state = feedSlice.reducer(initialState, action);
        expect(state.requestStatus).toBe(RequestStatus.Failed);
    });
});