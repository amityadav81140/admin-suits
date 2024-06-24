import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk('productCategories', async (props) => {
    if(props.subcategory){
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/category/`,{"parent_id": props.subcategory}, { headers: { 'Authorization': `Bearer ${props.token}` }, withCredentials: true });
        return response.data.data;
    }
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/category/`,{}, { headers: { 'Authorization': `Bearer ${props}` }, withCredentials: true });
    
    return response.data.data;
});

const categoriesAdapter = createEntityAdapter({
    selectId: (categories) => categories._id,
});

const categoriesSlice = createSlice({
    name: "categories",
    initialState: categoriesAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            categoriesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                categoriesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const categoriesSelector = categoriesAdapter.getSelectors((state) => state.categories);
export const { remove } = categoriesSlice.actions;
export default categoriesSlice.reducer;