import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: cartReducer,
  },
});

export default store;