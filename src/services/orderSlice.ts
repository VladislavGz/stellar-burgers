import { getOrderByNumberApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus, TOrder } from "@utils-types"

type TOrderState = {
    order: TOrder[] | [];
    requestStatus: RequestStatus;
}

const initialState: TOrderState = {
    order: [],
    requestStatus: RequestStatus.Idle
}

export const getOrderByNumber = createAsyncThunk(
    'order/getOrderByNumber',
    getOrderByNumberApi
)

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderByNumber.pending, (state) => {
                state.requestStatus = RequestStatus.Loading;
            })
            .addCase(getOrderByNumber.fulfilled, (state, action) => {
                state.requestStatus = RequestStatus.Success;
                state.order = action.payload.orders;
                console.log(action);
                
            })
            .addCase(getOrderByNumber.rejected, (state, error) => {
                state.requestStatus = RequestStatus.Failed;
                console.log(error);
            })
    },
    selectors: {
        getOrderInfo: (state) => state.order,
        selectorRequestStatus: (state) => state.requestStatus
    }
})

export const selectorOrder = orderSlice.selectors;