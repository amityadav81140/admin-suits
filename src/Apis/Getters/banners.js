import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBanners = createAsyncThunk('banners', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/banner/`,{}, { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true });
    
    return response.data.data;
})

const bannersAdapter = createEntityAdapter({
    selectId: (banners) => banners._id,
});

const bannersSlice = createSlice({
    name: "banners",
    initialState: bannersAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            bannersAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                bannersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const bannersSelector = bannersAdapter.getSelectors((state) => state.banners);
export const { remove } = bannersSlice.actions;
export default bannersSlice.reducer;