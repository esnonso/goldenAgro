import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    replaceCart(state, action) {
      const cart = action.payload;
      state.items = cart;
    },
    addTocart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (!existingItem) state.items.push(item);
      else existingItem.quantity += item.quantity;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    increaseCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      existingItem.quantity++;
    },
    decreaseCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1)
        state.items = state.items.filter((item) => item.id !== id);
      else existingItem.quantity--;
    },
    emptyCart(state) {
      console.log("empty");
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
