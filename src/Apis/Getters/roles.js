import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoles = createAsyncThunk('roles', async () => {
    const token = window.sessionStorage.getItem("access-vs");
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/role`, {}, 
    { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    );
    return response.data.data;
});

const rolesAddapter = createEntityAdapter({
    selectId: (roles) => roles._id,
});

const rolesSlice = createSlice({
    name: "roles",
    initialState: rolesAddapter.getInitialState(),
    reducers: {
        remove(state, action) {
            rolesAddapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                rolesAddapter.setAll(state, action.payload);
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const rolesSelector = rolesAddapter.getSelectors(state => state.roles);
export const { remove } = rolesSlice.actions;
export default rolesSlice.reducer;
