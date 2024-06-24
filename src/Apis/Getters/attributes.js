import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAttributes = createAsyncThunk('attributes', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/attribute`,
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

const attributesAdapter = createEntityAdapter({
    selectId: (attributes) => attributes._id,
});

const attributesSlice = createSlice({
    name: "attributes",
    initialState: attributesAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            attributesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttributes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAttributes.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                attributesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchAttributes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const attributesSelector = attributesAdapter.getSelectors((state) => state.attributes);
export const { remove } = attributesSlice.actions;
export default attributesSlice.reducer;