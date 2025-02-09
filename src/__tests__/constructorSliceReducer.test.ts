import { RequestStatus, TConstructorIngredient } from "@utils-types";
import { TConstructorState } from "../../src/services/constructorSlice";
import { initialState, constructorSlice, constructorActions } from "../../src/services/constructorSlice";

const { addItem, removeItem, moveDown, moveUp } = constructorActions;

const mockIngredients: TConstructorIngredient[] = [
    {
        id: 'test_0',
        _id: 'test_0',
        name: 'name_0',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: '',
    },

    {
        id: 'test_1',
        _id: 'test_1',
        name: 'name_1',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: '',
    },

    {
        id: 'test_2',
        _id: 'test_2',
        name: 'name_2',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_large: '',
        image_mobile: '',
    }
];

const prevState: TConstructorState = {...initialState, items: {bun: null, ingredients: mockIngredients}};

describe('constructorSlice reducer', () => {
    test('initialization correct', () => {
        const state = constructorSlice.reducer(undefined, {type: ''});
        expect(state).toEqual(initialState);
    });

    test('add ingredient', () => {
        const newIngredient: TConstructorIngredient = {
            id: 'test_3',
            _id: 'test_3',
            name: 'name_3',
            type: '',
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: '',
            image_large: '',
            image_mobile: '',
        };

        const state = constructorSlice.reducer(prevState, addItem(newIngredient));
        const ingredients = state.items.ingredients;
        const lastIngredient = ingredients[ingredients.length - 1];

        expect(ingredients.length).toBe(mockIngredients.length + 1);
        expect(lastIngredient).toEqual(newIngredient);
    });

    test('remove ingredient', () => {
        const testIngredients = [
            {
                id: 'test_0',
                _id: 'test_0',
                name: 'name_0',
                type: '',
                proteins: 0,
                fat: 0,
                carbohydrates: 0,
                calories: 0,
                price: 0,
                image: '',
                image_large: '',
                image_mobile: '',
            },

            {
                id: 'test_2',
                _id: 'test_2',
                name: 'name_2',
                type: '',
                proteins: 0,
                fat: 0,
                carbohydrates: 0,
                calories: 0,
                price: 0,
                image: '',
                image_large: '',
                image_mobile: '',
            }
        ];

        const state = constructorSlice.reducer(prevState, removeItem({ id: 'test_1' }));
        const ingredients = state.items.ingredients;

        expect(ingredients.length).toBe(mockIngredients.length - 1);
        expect(ingredients).toEqual(testIngredients);
    });

    test('moveDown ingredient', () => {
        const testIngredients = [
            {
                id: 'test_0',
                _id: 'test_0',
                name: 'name_0',
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
                id: 'test_2',
                _id: 'test_2',
                name: 'name_2',
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
                id: 'test_1',
                _id: 'test_1',
                name: 'name_1',
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

        const state = constructorSlice.reducer(prevState, moveDown(1));
        const ingredients = state.items.ingredients;

        expect(ingredients.length).toBe(mockIngredients.length);
        expect(ingredients).toEqual(testIngredients);
    });

    test('moveUp ingredient', () => {
        const testIngredients = [
            {
                id: 'test_1',
                _id: 'test_1',
                name: 'name_1',
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
                id: 'test_0',
                _id: 'test_0',
                name: 'name_0',
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
                id: 'test_2',
                _id: 'test_2',
                name: 'name_2',
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

        const state = constructorSlice.reducer(prevState, moveUp(1));
        const ingredients = state.items.ingredients;

        expect(ingredients.length).toBe(mockIngredients.length);
        expect(ingredients).toEqual(testIngredients);
    });

    // test('test getNewOrder action', () => {
    //     const successResponse = {
    //         ok: true,
    //         json: () => {
    //             return {
    //                 order: 'orderData',
    //                 name: 'orderName'
    //             }
    //         }
    //     } as unknown as Response;

    //     global.fetch = jest.fn(() => {
    //         return Promise.resolve(successResponse);
    //     }) as jest.Mock;




    // });
});