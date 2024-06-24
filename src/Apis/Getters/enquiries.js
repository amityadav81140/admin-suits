import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEnquiries = createAsyncThunk('enquiries', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/contactus_list`,{}, { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true });
    return response.data.data;
})

const enqiriesAdapter = createEntityAdapter({
    selectId: (enquiries) => enquiries._id,
});

const enquiriesSlice = createSlice({
    name: "enquiries",
    initialState: enqiriesAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            enqiriesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEnquiries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEnquiries.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                enqiriesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchEnquiries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const enquiriesSelector = enqiriesAdapter.getSelectors((state) => state.enquiries);
export const { remove } = enquiriesSlice.actions;
export default enquiriesSlice.reducer;