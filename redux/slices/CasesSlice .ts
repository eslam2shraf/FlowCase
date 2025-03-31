import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../app/firebase/config"; 

const db = getDatabase(app);

export const fetchCases = createAsyncThunk("cases/fetchCases", async () => {
    const casesRef = ref(db, "cases");
    const snapshot = await get(casesRef);


    if (!snapshot.exists()) {
        return []; 
    }

    const casesData = snapshot.val();

    return Object.keys(casesData).map((key) => ({
        id: key,
        ...casesData[key],
    }));
});


const casesSlice = createSlice({
    name: "cases",
    initialState: {
        cases: [],
        loading: false,
        error: null,
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchCases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCases.fulfilled, (state, action) => {
                state.loading = false;
                state.cases = action.payload;
            })
            .addCase(fetchCases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default casesSlice.reducer;
