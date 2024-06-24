import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMenus = createAsyncThunk('menus', async () => {
    const token = window.sessionStorage.getItem("access-vs");
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/menu`, {}, 
    { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    );
    return response.data.data;
});

const menusAddapter = createEntityAdapter({
    selectId: (menus) => menus._id,
});

const menusSlice = createSlice({
    name: "menus",
    initialState: menusAddapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenus.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                menusAddapter.setAll(state, action.payload);
            })
            .addCase(fetchMenus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const menusSelector = menusAddapter.getSelectors(state => state.menus);
export default menusSlice.reducer;
