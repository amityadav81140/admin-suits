import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPayments = createAsyncThunk('payments', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/transactions`,
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

const paymentsAdapter = createEntityAdapter({
    selectId: (payments) => payments.invoice_no,
});

const paymentsSlice = createSlice({
    name: "payments",
    initialState: paymentsAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            paymentsAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                paymentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const paymentsSelector = paymentsAdapter.getSelectors((state) => state.payments);
export const { remove } = paymentsSlice.actions;
export default paymentsSlice.reducer;