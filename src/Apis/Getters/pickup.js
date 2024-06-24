import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPickup = createAsyncThunk('pickup', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/warehouse`,
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

const pickupAdapter = createEntityAdapter({
    selectId: (pickup) => pickup._id,
});

const pickupSlice = createSlice({
    name: "pickup",
    initialState: pickupAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            pickupAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPickup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPickup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                pickupAdapter.setAll(state, action.payload);
            })
            .addCase(fetchPickup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const pickupSelector = pickupAdapter.getSelectors((state) => state.pickup);
export const { remove } = pickupSlice.actions;
export default pickupSlice.reducer;