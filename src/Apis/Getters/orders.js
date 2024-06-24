import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk('orders', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/order/allOrders`,
    {}, 
    { 
        headers: 
        { 
            'Authorization': `Bearer ${token}` 
        }, 
        withCredentials: true 
    });
    return response.data.data;
})

const ordersAdapter = createEntityAdapter({
    selectId: (orders) => orders._id,
});

const ordersSlice = createSlice({
    name: "orders",
    initialState: ordersAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            ordersAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                ordersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const ordersSelector = ordersAdapter.getSelectors((state) => state.orders);
export const { remove } = ordersSlice.actions;
export default ordersSlice.reducer;