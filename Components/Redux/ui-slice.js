import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    sidebarIsVisible: false,
  },
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    toggleSidebar(state) {
      state.sidebarIsVisible = !state.sidebarIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
