import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../app/firebase/config"; 


const db = getDatabase(app);

export const fetchEmployee = createAsyncThunk("employees/fetchEmployee", async () => {
    const employeeRef = ref(db, "employees");
    const snapshot = await get(employeeRef);

    if (!snapshot.exists()) {
        return []; 
    }

    const employeeData = snapshot.val();
    

    return Object.keys(employeeData).map((key) => ({
        id: key,
        ...employeeData[key],
    }));
});

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employee: [],
        loading: false,
        error: null,
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
            })
            .addCase(fetchEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default employeeSlice.reducer;
