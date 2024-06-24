import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNewsletters = createAsyncThunk('newsletters', async (token) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}admin/newsletter`, { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true });
    return response.data.data;
})

const newslettersAdapter = createEntityAdapter({
    selectId: (newsletters) => newsletters._id,
});

const newslettersSlice = createSlice({
    name: "newsletters",
    initialState: newslettersAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            newslettersAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsletters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsletters.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                newslettersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchNewsletters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const newslettersSelector = newslettersAdapter.getSelectors((state) => state.newsletters);
export const { remove } = newslettersSlice.actions;
export default newslettersSlice.reducer;