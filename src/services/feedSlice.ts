import { getFeedsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus, TOrder } from "@utils-types";

type TFeedState = {
  orders: TOrder[] | []
  requestStatus: RequestStatus
}

const initialState: TFeedState = {
  orders: [],
  requestStatus: RequestStatus.Idle
}

export const getFeeds = createAsyncThunk(
  'feeds/getFeeds',
  getFeedsApi
);

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.orders = action.payload.orders;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
  },
  selectors: {
    getFeedInfo: (state: TFeedState) => state.orders
  }
});

export const selectorFeed = feedSlice.selectors;