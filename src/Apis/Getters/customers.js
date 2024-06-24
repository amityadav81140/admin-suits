import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomers = createAsyncThunk('customers', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/customer/list`,
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

const customersAdapter = createEntityAdapter({
    selectId: (customers) => customers._id,
});

const customersSlice = createSlice({
    name: "customers",
    initialState: customersAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            customersAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                customersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const customersSelector = customersAdapter.getSelectors((state) => state.customers);
export const { remove } = customersSlice.actions;
export default customersSlice.reducer;