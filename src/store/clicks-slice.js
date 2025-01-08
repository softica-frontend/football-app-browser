import { createSlice } from "@reduxjs/toolkit";

export const clicksSlice = createSlice({
  name: "clicks",
  initialState: 1,
  reducers: {
    plusClick: (state) => {
      return state + 1;
    },
    resetClicks: () => {
      return 1;
    },
  },
});

export const { plusClick, resetClicks } = clicksSlice.actions;
export const clicksReducer = clicksSlice.reducer;
