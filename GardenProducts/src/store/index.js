import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import saleFormReducer from './saleFormSlice';
import skeletonReducer from "./skeletonSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    saleForm: saleFormReducer,
    skeleton: skeletonReducer,
  }
});
