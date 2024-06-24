import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReviews = createAsyncThunk('reviews', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/review`,{}, { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true });
    return response.data.data;
})

const reviewsAdapter = createEntityAdapter({
    selectId: (reviews) => reviews._id,
});

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: reviewsAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            reviewsAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                reviewsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const reviewsSelector = reviewsAdapter.getSelectors((state) => state.reviews);
export const { remove } = reviewsSlice.actions;
export default reviewsSlice.reducer;