import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error('Ошибка при загрузке корзины из localStorage:', error);
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(items));
  } catch (error) {
    console.error('Ошибка при сохранении корзины в localStorage:', error);
  }
};

const initialState = {
  items: loadCartFromStorage(), 
};

const createDiscountedItemId = (originalId) => `${originalId}_daily_discount`;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      saveCartToStorage(state.items);
    },
    addToCart(state, action) {
      const { id, count, hasDiscount, discountPrice, originalPrice, isDailyDeal } = action.payload;
      
      if (isDailyDeal) {
        const discountedId = createDiscountedItemId(id);
        const existingDiscounted = state.items.find(item => item.id === discountedId);
        
        if (!existingDiscounted) {
          state.items.push({
            id: discountedId,
            originalId: id,
            count: 1,
            hasDiscount: true,
            discountPrice,
            originalPrice,
            isDiscountItem: true,
            isDailyDeal: true
          });
        }
      } else {
        const existing = state.items.find(item => item.id === id && !item.isDiscountItem);
        if (existing) {
          existing.count += count || 1;
        } else {
          state.items.push({ 
            id, 
            count: count || 1,
            hasDiscount: hasDiscount || false,
            discountPrice: discountPrice || null,
            originalPrice: originalPrice || null,
            isDiscountItem: false,
            isDailyDeal: false
          });
        }
      }
      saveCartToStorage(state.items); 
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state.items); 
    },
    increment(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && !item.isDailyDeal) {
        item.count += 1;
        saveCartToStorage(state.items); 
      }
    },
    decrement(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && !item.isDailyDeal) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
        saveCartToStorage(state.items); 
      } else if (item && item.isDailyDeal) {
        state.items = state.items.filter(i => i.id !== action.payload);
        saveCartToStorage(state.items); 
      }
    },
    clearCart(state) {
      state.items = [];
      saveCartToStorage(state.items); 
    }
  }
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increment,
  decrement,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;