import { RequestStatus, TConstructorIngredient, TOrder } from '@utils-types';
import { TConstructorState } from '../../src/services/constructorSlice';
import {
  initialState,
  constructorSlice,
  constructorActions,
  getNewOrder
} from '../../src/services/constructorSlice';

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

const mockOrder: TOrder = {
  _id: 'new_order_id',
  status: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  number: 0,
  ingredients: ['1', '2']
};

const mockState: TConstructorState = {
  ...initialState,
  items: { bun: null, ingredients: mockIngredients }
};

describe('constructorSlice reducer', () => {
  test('initialization correct', () => {
    const state = constructorSlice.reducer(undefined, { type: '' });
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
      image_mobile: ''
    };

    const state = constructorSlice.reducer(mockState, addItem(newIngredient));
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

    const state = constructorSlice.reducer(
      mockState,
      removeItem({ id: 'test_1' })
    );
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

    const state = constructorSlice.reducer(mockState, moveDown(1));
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

    const state = constructorSlice.reducer(mockState, moveUp(1));
    const ingredients = state.items.ingredients;

    expect(ingredients.length).toBe(mockIngredients.length);
    expect(ingredients).toEqual(testIngredients);
  });

  test('getNewOrder pending', () => {
    const action = { type: getNewOrder.pending.type };
    const state = constructorSlice.reducer(mockState, action);

    expect(state.order.isOrderRequest).toBe(true);
    expect(state.order.requestStatus).toBe(RequestStatus.Loading);
  });

  test('getNewOrder fulfilled', () => {
    const action = {
      type: getNewOrder.fulfilled.type,
      payload: {
        order: mockOrder
      }
    };
    const state = constructorSlice.reducer(mockState, action);

    expect(state.order.isOrderRequest).toBe(true);
    expect(state.order.requestStatus).toBe(RequestStatus.Success);
    expect(state.order.orderData).toEqual(mockOrder);
  });

  test('getNewOrder rejected', () => {
    const action = { type: getNewOrder.rejected.type };
    const state = constructorSlice.reducer(mockState, action);

    expect(state.order.isOrderRequest).toBe(true);
    expect(state.order.requestStatus).toBe(RequestStatus.Failed);
  });
});
