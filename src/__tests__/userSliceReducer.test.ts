/**
 * @jest-environment jsdom
 */

import { TUser } from '@utils-types';
import {
  userSlice,
  initialState,
  getUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser
} from '../../src/services/userSlice';
import { getCookie, setCookie } from '../../src/utils/cookie';

const mockUser: TUser = {
  email: 'user@test.ru',
  name: 'userName'
};

const mockAccessToken = 'mock-access-token';
const mockRefreshToken = 'mock-refresh-token';

const mockErrorMessage = 'mock err';

describe('userSlice reducer', () => {
  beforeEach(() => {
    setCookie('accessToken', 'default');
    localStorage.setItem('refreshToken', 'default');
  });

  test('initialization correct', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('getUser action', () => {
    test('getUser fulfilled', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: {
          user: mockUser
        }
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    test('getUser rejected', () => {
      const action = { type: getUser.rejected.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('loginUser action', () => {
    test('loginUser pending', () => {
      const prevState = { ...initialState, loginErrorMessage: 'prev error' };
      const action = { type: loginUser.pending.type };
      const state = userSlice.reducer(prevState, action);
      expect(state.loginErrorMessage).toBe('');
    });

    test('loginUser fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: {
          user: mockUser,
          accessToken: mockAccessToken,
          refreshToken: mockRefreshToken
        }
      };
      const state = userSlice.reducer(initialState, action);
      const accessToken = getCookie('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      expect(state.user).toEqual(mockUser);
      expect(accessToken).toBe(mockAccessToken);
      expect(refreshToken).toBe(mockRefreshToken);
    });

    test('loginUser rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: {
          message: mockErrorMessage
        }
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.loginErrorMessage).toBe(mockErrorMessage);
    });
  });

  describe('registerUser action', () => {
    test('registerUser pending', () => {
      const prevState = { ...initialState, registerErrorMessage: 'prev error' };
      const action = { type: registerUser.pending.type };
      const state = userSlice.reducer(prevState, action);
      expect(state.registerErrorMessage).toBe('');
    });

    test('registerUser fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: {
          user: mockUser,
          accessToken: mockAccessToken,
          refreshToken: mockRefreshToken
        }
      };
      const state = userSlice.reducer(initialState, action);
      const accessToken = getCookie('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      expect(state.user).toEqual(mockUser);
      expect(accessToken).toBe(mockAccessToken);
      expect(refreshToken).toBe(mockRefreshToken);
    });

    test('registerUser rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: {
          message: mockErrorMessage
        }
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.registerErrorMessage).toBe(mockErrorMessage);
    });
  });

  describe('logoutUser action', () => {
    test('logoutUser fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = userSlice.reducer(initialState, action);
      const accessToken = getCookie('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      expect(state.user).toBe(null);
      expect(accessToken).toBe(undefined);
      expect(refreshToken).toBe(null);
    });
  });

  describe('updateUser action', () => {
    test('registerUser pending', () => {
      const prevState = { ...initialState, updateErrorMessage: 'prev error' };
      const action = { type: updateUser.pending.type };
      const state = userSlice.reducer(prevState, action);
      expect(state.updateErrorMessage).toBe('');
    });

    test('updateUser fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: {
          user: mockUser
        }
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
    });

    test('updateUser rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: {
          message: mockErrorMessage
        }
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.updateErrorMessage).toBe(mockErrorMessage);
    });
  });
});
