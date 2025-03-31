import { configureStore } from '@reduxjs/toolkit';
import authReducer from'./slices/authSlice';
import employeeSlice from'./slices/EmployeesSlice'
import casesSlice from'./slices/CasesSlice '
export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee:employeeSlice,
    cases:casesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;