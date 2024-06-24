import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTestimonials = createAsyncThunk('testimonials', async () => {
    const token = window.sessionStorage.getItem("access-vs");
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/testimonial`, {},
        { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    );
    return response.data.data;
});

const testimonialsAddapter = createEntityAdapter({
    selectId: (testimonials) => testimonials._id,
});

const testimonialsSlice = createSlice({
    name: "testimonials",
    initialState: testimonialsAddapter.getInitialState(),
    reducers: {
        remove(state, action) {
            testimonialsAddapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestimonials.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                testimonialsAddapter.setAll(state, action.payload);
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const testimonialsSelector = testimonialsAddapter.getSelectors(state => state.testimonials);
export const { remove } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
