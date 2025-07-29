import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import saleFormReducer from './saleFormSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    saleForm: saleFormReducer,
    
  }
});
