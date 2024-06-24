import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployees = createAsyncThunk('employees', async (token) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}admin/employee`,
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

const employeesAdapter = createEntityAdapter({
    selectId: (employees) => employees._id,
});

const employeesSlice = createSlice({
    name: "employees",
    initialState: employeesAdapter.getInitialState(),
    reducers: {
        remove(state, action) {
            employeesAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                employeesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addDefaultCase((state) => {
                return state;
            })
    },
});

export const employeesSelector = employeesAdapter.getSelectors((state) => state.employees);
export const { remove } = employeesSlice.actions;
export default employeesSlice.reducer;