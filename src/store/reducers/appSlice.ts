import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    currentPage: 1,
    perview: 10,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPerview: (state, action) => {
      state.perview = action.payload;
    },
  },
});

export const { setCurrentPage, setPerview } = appSlice.actions;
export default appSlice.reducer;
