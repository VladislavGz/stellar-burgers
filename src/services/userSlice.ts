import { getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types"
import { deleteCookie, setCookie } from "../utils/cookie";



type TUserState = {
    user: TUser | null;
    isAuthChecked: boolean;
    loginErrorMessage: string;
    registerErrorMessage: string;
    updateErrorMessage: string;
}

const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    loginErrorMessage: '',
    registerErrorMessage: '',
    updateErrorMessage: ''
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

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    logoutApi
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    updateUserApi
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
                state.user = action.payload.user;
                setCookie('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(loginUser.rejected, (state, error) => {
                state.loginErrorMessage = error.error.message || '';
            })

            //регистрация
            .addCase(registerUser.pending, (state) => {
                state.registerErrorMessage = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                setCookie('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(registerUser.rejected, (state, error) => {
                state.registerErrorMessage = error.error.message || '';
            })

            //выход
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .addCase(logoutUser.rejected, (state, error) => {
                console.log(error);
            })

            //обновление данных
            .addCase(updateUser.pending, (state) => {
                state.updateErrorMessage = '';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(updateUser.rejected, (state, error) => {
                state.updateErrorMessage = error.error.message || '';
            })

    },
    selectors: {
        selectorIsAuthChecked: (state: TUserState) => state.isAuthChecked,
        selectorUserData: (state: TUserState) => state.user,
        selectorLoginErrorMessage: (state: TUserState) => state.loginErrorMessage,
        selectorRegisterErrorMessage: (state: TUserState) => state.registerErrorMessage,
        selectorUpdateErrorMessage: (state: TUserState) => state.updateErrorMessage
    }
});

export const selectorUser = userSlice.selectors;