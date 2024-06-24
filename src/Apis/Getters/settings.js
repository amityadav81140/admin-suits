import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSettings = createAsyncThunk('settings', async (type) => {
    const token = window.sessionStorage.getItem("access-vs");
    const credentials = { type };
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}business_settings_get`, credentials, 
    { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    );
    // const res = [response.data.data]
    return response.data.data;
});


const settingsAddapter = createEntityAdapter({
    selectId: (settings) => settings.id,
});

const settingsSlice = createSlice({
    name: "settings",
    initialState: settingsAddapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                settingsAddapter.setAll(state, action.payload);
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const settingsSelector = settingsAddapter.getSelectors(state => state.settings);
export default settingsSlice.reducer;
