import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFaqs = createAsyncThunk('faqs', async () => {
    const token = window.sessionStorage.getItem("access-vs");
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/faq`, {}, 
    { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    );
    return response.data.data;
});

const faqsAddapter = createEntityAdapter({
    selectId: (faqs) => faqs._id,
});

const faqsSlice = createSlice({
    name: "faqs",
    initialState: faqsAddapter.getInitialState(),
    reducers: {
        remove(state, action) {
            faqsAddapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFaqs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFaqs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                faqsAddapter.setAll(state, action.payload);
            })
            .addCase(fetchFaqs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const faqsSelector = faqsAddapter.getSelectors(state => state.faqs);
export const { remove } = faqsSlice.actions;
export default faqsSlice.reducer;
