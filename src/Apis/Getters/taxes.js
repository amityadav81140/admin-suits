import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTaxes = createAsyncThunk('taxes', async () => {
    const token = window.sessionStorage.getItem("access-vs");
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/tax`, {}, 
    { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    );
    return response.data.data;
});

const taxesAddapter = createEntityAdapter({
    selectId: (taxes) => taxes._id,
});

const taxesSlice = createSlice({
    name: "taxes",
    initialState: taxesAddapter.getInitialState(),
    reducers: {
        remove(state, action) {
            taxesAddapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaxes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTaxes.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                taxesAddapter.setAll(state, action.payload);
            })
            .addCase(fetchTaxes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const taxesSelector = taxesAddapter.getSelectors(state => state.taxes);
export const { remove } = taxesSlice.actions;
export default taxesSlice.reducer;
