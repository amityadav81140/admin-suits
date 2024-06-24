import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStory = createAsyncThunk('story', async (props) => {
    const token = window.sessionStorage.getItem("access-vs");
    const credentials = { page: props }
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/page_type`, credentials,
        { headers: { 'Authorization': `Bearer ${token}` }, withCredentials: true }
    );
    return response.data.data;
});

const storyAddapter = createEntityAdapter({
    selectId: (story) => story._id,
});

const storySlice = createSlice({
    name: "story",
    initialState: storyAddapter.getInitialState(),
    reducers: {
        remove(state, action) {
            storyAddapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                storyAddapter.setAll(state, action.payload);
            })
            .addCase(fetchStory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const storySelector = storyAddapter.getSelectors(state => state.story);
export const { remove } = storySlice.actions;
export default storySlice.reducer;
