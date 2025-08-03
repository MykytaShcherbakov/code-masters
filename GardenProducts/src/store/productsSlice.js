import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  minPrice: '',
  maxPrice: '',
  sortOrder: 'default',
  showDiscountedOnly: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setShowDiscountedOnly: (state, action) => {
      state.showDiscountedOnly = action.payload;
    },
  },
});

export const {
  setProducts,
  setMinPrice,
  setMaxPrice,
  setSortOrder,
  setShowDiscountedOnly,
} = productsSlice.actions;

export const selectProducts = (state) => state.products.products;
const selectMinPrice = (state) => state.products.minPrice;
const selectMaxPrice = (state) => state.products.maxPrice;
const selectSortOrder = (state) => state.products.sortOrder;
const selectShowDiscountedOnly = (state) => state.products.showDiscountedOnly;




export const selectDiscountedItems = createSelector(
  [selectProducts],
  (products) => products.filter((product) => product.discont_price !== null)
);

export const selectLikedProducts = createSelector(
  [selectProducts],
  (products) => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return products.filter((product) =>
        favorites.includes(String(product.id))
      );
    } catch (e) {
      console.error('Failed to parse favorites from localStorage', e);
      return [];
    }
  }
);
export const selectCategoryProducts = createSelector(
  [selectProducts, (state, categoryId) => categoryId], 
  (products, categoryId) => {
  
    const numericCategoryId = parseInt(categoryId);
    if (isNaN(numericCategoryId)) {
      return []; 
    }
    return products.filter(
      (product) => product.categoryId === numericCategoryId
    );
  }
);

export const selectFilteredProducts = createSelector(
  [
    (state, productsSourceSelector, useDiscountOnlyFilter = false) =>
      productsSourceSelector(state),
    selectMinPrice,
    selectMaxPrice,
    (state, productsSourceSelector, useDiscountOnlyFilter = false) =>
      useDiscountOnlyFilter,
  ],
  (products, minPrice, maxPrice, useDiscountOnlyFilter) => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;

  
    const initialFiltered = useDiscountOnlyFilter
      ? products.filter((product) => product.discont_price !== null)
      : products;

 
    const priceFiltered = initialFiltered.filter((product) => {
      const realPrice = product.discont_price ?? product.price;
      return realPrice >= min && realPrice <= max;
    });

    return priceFiltered;
  }
);

export const selectSortedProducts = createSelector(
  [
    (state, productsSourceSelector, useDiscountOnlyFilter = false) =>
      selectFilteredProducts(
        state,
        productsSourceSelector,
        useDiscountOnlyFilter
      ),
    selectSortOrder,
  ],
  (filteredProducts, sortOrder) => {
    let sorted = [...filteredProducts];
    if (sortOrder === 'price-asc') {
      sorted.sort((a, b) => {
        const priceA = a.discont_price ?? a.price;
        const priceB = b.discont_price ?? b.price;
        return priceA - priceB;
      });
    } else if (sortOrder === 'price-desc') {
      sorted.sort((a, b) => {
        const priceA = a.discont_price ?? a.price;
        const priceB = b.discont_price ?? b.price;
        return priceB - priceA;
      });
    }
    return sorted;
  }
);

export default productsSlice.reducer;
