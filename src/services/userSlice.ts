import { getUserApi, loginUserApi, registerUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types"



type TUserState = {
    user: TUser | null;
    isAuthChecked: boolean;
    loginErrorMessage: string;
    registerErrorMessage: string;
}

const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    loginErrorMessage: '',
    registerErrorMessage: ''
}

export const getUser = createAsyncThunk(
    'user/getUser',
    getUserApi
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    loginUserApi
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    registerUserApi
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //проверка
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.isAuthChecked = true;
            })

            //логин
            .addCase(loginUser.pending, (state) => {
                state.loginErrorMessage = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(loginUser.rejected, (state, error) => {
                state.loginErrorMessage = error.error.message || '';
            })

            //регистрация
            .addCase(registerUser.pending, (state) => {
                state.registerErrorMessage = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(registerUser.rejected, (state, error) => {
                state.registerErrorMessage = error.error.message || '';
            })

    },
    selectors: {
        selectorIsAuthChecked: (state: TUserState) => state.isAuthChecked,
        selectorUserData: (state: TUserState) => state.user,
        selectorLoginErrorMessage: (state: TUserState) => state.loginErrorMessage,
        selectorRegisterErrorMessage: (state: TUserState) => state.registerErrorMessage,
    }
});

export const selectorUser = userSlice.selectors;