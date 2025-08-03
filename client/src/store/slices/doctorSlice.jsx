import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState: [],
  reducers: {
    doctorInfo: (state, action) => {
      state.push(action.payload);
    }
  }
});

// Export the action
export const { doctorInfo } = doctorSlice.actions;

// ✅ Export the reducer as default
export default doctorSlice.reducer;
