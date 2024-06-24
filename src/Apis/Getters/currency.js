import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrency = createAsyncThunk('currency', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/currency`,
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

const currencyAdapter = createEntityAdapter({
    selectId: (currency) => currency._id,
});

const currencySlice = createSlice({
    name: "currency",
    initialState: currencyAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            currencyAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrency.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                currencyAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCurrency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const currencySelector = currencyAdapter.getSelectors((state) => state.currency);
export const { remove } = currencySlice.actions;
export default currencySlice.reducer;