import { rootReducer, store } from "../../src/services/store"

describe('root reducer', () => {
    test('test root reducer', () => {
        expect(rootReducer(undefined, {type: ''})).toEqual(store.getState());
    });
});