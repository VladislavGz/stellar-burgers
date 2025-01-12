import { getOrdersApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus, TOrder } from "@utils-types"



type TOrdersState = {
    orders: TOrder[] | [];
    requestStatus: RequestStatus;
}

const initialState: TOrdersState = {
    orders: [],
    requestStatus: RequestStatus.Idle
}

export const getOrders = createAsyncThunk(
    'orders/getOrders',
    getOrdersApi
)

export const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.requestStatus = RequestStatus.Loading;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.requestStatus = RequestStatus.Success;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state) => {
                state.requestStatus = RequestStatus.Failed;
            })
    },
    selectors: {
        getOrdersInfo: (state: TOrdersState) => state.orders,
        selectorRequestStatus: (state: TOrdersState) => state.requestStatus
    }
});

export const selectorOrders = ordersSlice.selectors;