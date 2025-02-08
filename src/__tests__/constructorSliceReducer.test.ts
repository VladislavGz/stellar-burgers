import { RequestStatus, TConstructorIngredient } from "@utils-types";
import { TConstructorState } from "../../src/services/constructorSlice";
import { constructorReducer, constructorActions } from "../../src/services/constructorSlice";

describe('constructorSlice reducer', () => {
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
    }

    const initialState: TConstructorState = {
        items: {
            bun: null,
            ingredients: mockIngredients
        },
        order: {
            orderData: null,
            isOrderRequest: false,
            requestStatus: RequestStatus.Idle
        }
    }

    test('test add ingredient', () => {
        const initialIngredientsLength = mockIngredients.length;
        const newState = constructorReducer(initialState, addItem(newIngredient));
        const ingredients = newState.items.ingredients;
        const lastIngredient = ingredients[ingredients.length - 1];

        expect(ingredients.length).toBe(initialIngredientsLength + 1);
        expect(lastIngredient).toEqual(newIngredient);
    });

    test('test remove ingredient', () => {
        const initialIngredientsLength = mockIngredients.length;
        const newState = constructorReducer(initialState, removeItem({ id: 'test_1' }));
        const ingredients = newState.items.ingredients;

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
        ]

        expect(ingredients.length).toBe(initialIngredientsLength - 1);
        expect(ingredients).toEqual(testIngredients);
    });

    test('test moveDown ingredient', () => {
        const initialIngredientsLength = mockIngredients.length;
        const newState = constructorReducer(initialState, moveDown(1));
        const ingredients = newState.items.ingredients;

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

        expect(ingredients.length).toBe(initialIngredientsLength);
        expect(ingredients).toEqual(testIngredients);
    });

    test('test moveUp ingredient', () => {
        const initialIngredientsLength = mockIngredients.length;
        const newState = constructorReducer(initialState, moveUp(1));
        const ingredients = newState.items.ingredients;

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

        expect(ingredients.length).toBe(initialIngredientsLength);
        expect(ingredients).toEqual(testIngredients);
    });
});