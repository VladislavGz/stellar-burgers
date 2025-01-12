import { getUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types"



type TUserState = {
    user: TUser | null;
    isAuthChecked: boolean;
}

const initialState: TUserState = {
    user: null,
    isAuthChecked: false
}

export const getUser = createAsyncThunk(
    'getUser',
    getUserApi
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthChecked = true;
            })
            .addCase(getUser.rejected, (state) => {
                state.isAuthChecked = true;
            })
    },
    selectors: {
        selectorIsAuthChecked: (state: TUserState) => state.isAuthChecked,
        selectorUserData: (state: TUserState) => state.user
    }
});

export const selectorUser = userSlice.selectors;