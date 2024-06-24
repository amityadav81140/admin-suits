import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts =  createAsyncThunk('products', async(token)=>{
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/product`,{},{
        headers:{
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
    });
    return response.data.data;
});

const productsAdapter = createEntityAdapter({
    selectId: (products)=>products._id,
});

const productsSlice = createSlice({
    name: 'products',
    initialState: productsAdapter.getInitialState(),
    reducers: {
        remove(state, action){
            productsAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchProducts.pending, (state)=>{
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.loading = false;
            state.error = null;
            productsAdapter.setAll(state, action.payload);
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error;
        })
        .addDefaultCase((state)=>{
            return state;
        })
    },
})

export const productsSelector = productsAdapter.getSelectors(state=>state.products);
export const {remove} = productsSlice.actions;
export default productsSlice.reducer;