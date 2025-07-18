import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },
    addToCart(state, action) {
      const { id } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        existing.count += 1;
      } else {
        state.items.push({ id, count: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    increment(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.count += 1;
    },
    decrement(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.count > 1) item.count -= 1;
      else state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  setCart, addToCart, removeFromCart,
  increment, decrement, clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
