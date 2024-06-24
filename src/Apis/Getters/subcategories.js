import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubCategories = createAsyncThunk('productSubCategories', async (props) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/category/`, { "parent_id": props.subcategory }, { headers: { 'Authorization': `Bearer ${props.token}` }, withCredentials: true });
    return response.data.data;
});

const subcategoriesAdapter = createEntityAdapter({
    selectId: (subcategories) => subcategories._id,
});

const subcategoriesSlice = createSlice({
    name: "subcategories",
    initialState: subcategoriesAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            subcategoriesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                subcategoriesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const subcategoriesSelector = subcategoriesAdapter.getSelectors((state) => state.subcategories);
export const { remove } = subcategoriesSlice.actions;
export default subcategoriesSlice.reducer;