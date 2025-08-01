import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import saleFormReducer from './saleFormSlice'; // Добавить этот импорт

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    saleForm: saleFormReducer, // Добавить этот reducer
  }
});
console.log(store);
