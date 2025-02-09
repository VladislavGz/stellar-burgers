import { RequestStatus, TIngredient } from "@utils-types";
import { ingredientsSlice, initialState, getIngredients } from "../../src/services/ingredientsSlice";

const mockIngredients: TIngredient[] = [
    {
        _id: 'ingredient_1',
        name: 'ingredient_1',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: ''
    },

    {
        _id: 'ingredient_2',
        name: 'ingredient_2',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: ''
    }
];

describe('ingredientsSlice reducer', () => {
    test('initialization correct', () => {
        const state = ingredientsSlice.reducer(undefined, { type: '' });
        expect(state).toEqual(initialState);
    });

    test('getIngredients pending', () => {
        const action = { type: getIngredients.pending.type };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state.status).toBe(RequestStatus.Loading);
    });

    test('getIngredients fulfilled', () => {
        const action = { type: getIngredients.fulfilled.type, payload: mockIngredients };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state.status).toBe(RequestStatus.Success);
        expect(state.data).toEqual(mockIngredients);
    });

    test('getIngredients rejected', () => {
        const action = { type: getIngredients.rejected.type };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state.status).toBe(RequestStatus.Failed);
    });
});