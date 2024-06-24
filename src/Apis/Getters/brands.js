import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBrands = createAsyncThunk('brands', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/brands/`,{}, { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true });
    
    return response.data.data;
})

const brandsAdapter = createEntityAdapter({
    selectId: (brands) => brands._id,
});

const brandsSlice = createSlice({
    name: "brands",
    initialState: brandsAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            brandsAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                brandsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const brandsSelector = brandsAdapter.getSelectors((state) => state.brands);
export const { remove } = brandsSlice.actions;
export default brandsSlice.reducer;