import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import saleFormReducer from './saleFormSlice';
import productsSliceReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    saleForm: saleFormReducer,
    products: productsSliceReducer,
  },
});
