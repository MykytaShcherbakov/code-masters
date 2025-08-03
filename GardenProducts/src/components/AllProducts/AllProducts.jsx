import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import useSkeletonLoader from '../ProductSkeleton/useSkeletonLoader';
import ProductSkeleton from '../ProductSkeleton/ProductSkeleton';
import {
  setProducts,
  setMinPrice,
  setMaxPrice,
  setSortOrder,
  setShowDiscountedOnly,
  selectSortedProducts,
} from '../../store/productsSlice';
import './AllProducts.scss';

export default function AllProducts() {
  const products = useLoaderData() || [];
  const localLoading = useSkeletonLoader(100);
  const dispatch = useDispatch();

  const min = parseFloat(minPrice) || 0;
  const max = parseFloat(maxPrice) || Infinity;

  const sortedFilteredProducts = useSelector((state) =>
    selectSortedProducts(
      state,
      (innerState) => innerState.products.products,
      showDiscountedOnly
    )
  );

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      dispatch(setProducts(products));
    }
  }, [dispatch, products]);

  return (
    <div className="container">
     

      <h1 className="page-title">All Products</h1>

      <div className="filters-panel">
        <div className="filter-group">
          <label htmlFor="price-from" className="filter-label">
            Price
          </label>
          <input
            type="number"
            id="price-from"
            placeholder="from"
            className="filter-input"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            id="price-to"
            placeholder="to"
            className="filter-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="checkbox-container">
          <label className="checkbox-label" htmlFor="discounted-items">
            Discounted items
          </label>
          <input
            className="checkbox-input"
            type="checkbox"
            id="discounted-items"
            checked={showDiscountedOnly}
            onChange={(e) => setShowDiscountedOnly(e.target.checked)}
          />
        </div>

        <div className="filter-group-sorted">
          <label htmlFor="sort-by" className="filter-label">
            Sorted
          </label>
          <select
            id="sort-by"
            className="filter-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">by default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {localLoading ? (
          <ProductSkeleton />
        ) : sortedFilteredProducts.length > 0 ? (
          sortedFilteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products-on-sale">No products found</p>
        )}
      </div>
    </div>
  );
}