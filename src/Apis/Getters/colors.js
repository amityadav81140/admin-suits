import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchColors = createAsyncThunk('colors', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/color`,{}, { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true });
    
    return response.data.data;
})

const colorsAdapter = createEntityAdapter({
    selectId: (colors) => colors._id,
});

const colorsSlice = createSlice({
    name: "colors",
    initialState: colorsAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            colorsAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchColors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchColors.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                colorsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchColors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const colorsSelector = colorsAdapter.getSelectors((state) => state.colors);
export const { remove } = colorsSlice.actions;
export default colorsSlice.reducer;