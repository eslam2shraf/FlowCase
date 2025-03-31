import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../app/firebase/config"; 

// Initialize Firebase Database
const db = getDatabase(app);

// 🔹 Fetch employee Async Thunk
export const fetchEmployee = createAsyncThunk("employees/fetchEmployee", async () => {
    const employeeRef = ref(db, "employees");
    const snapshot = await get(employeeRef);
    console.log("🔥 Firebase Snapshot Exists:", snapshot.exists());
    console.log("📦 Raw Firebase Data:", snapshot.val());

    if (!snapshot.exists()) {
        return []; // No employee found
    }

    const employeeData = snapshot.val();
    
    // Convert object to array
    return Object.keys(employeeData).map((key) => ({
        id: key,
        ...employeeData[key],
    }));
});

// 🔹 Create employee Slice
const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employee: [],
        loading: false,
        error: null,
    },
    reducers: {}, // No extra reducers needed
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
