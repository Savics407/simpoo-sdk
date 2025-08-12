import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    currentPage: 1,
    perview: 10,
    inline_update: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPerview: (state, action) => {
      state.perview = action.payload;
    },
    triggerUpdate: (state) => {
      state.inline_update = state.inline_update + 1;
    },
  },
});

export const { setCurrentPage, setPerview, triggerUpdate } = appSlice.actions;
export default appSlice.reducer;
