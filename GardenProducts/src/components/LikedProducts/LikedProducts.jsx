import React, { useEffect } from 'react';
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
  selectSortedProducts,
  selectLikedProducts,
} from '../../store/productsSlice';
import './LikedProducts.scss';

export default function LikedProducts() {
  const products = useLoaderData() || [];
  const localLoading = useSkeletonLoader(100);
  const dispatch = useDispatch();

  const minPrice = useSelector((state) => state.products.minPrice);
  const maxPrice = useSelector((state) => state.products.maxPrice);
  const sortOrder = useSelector((state) => state.products.sortOrder);

  const sortedFilteredLiked = useSelector((state) =>
    selectSortedProducts(state, selectLikedProducts, false)
  );

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

  return (
    <div className="container">
      <h1 className="page-title">Liked products</h1>

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
            onChange={(e) => dispatch(setMinPrice(e.target.value))}
          />
          <input
            type="number"
            id="price-to"
            placeholder="to"
            className="filter-input"
            value={maxPrice}
            onChange={(e) => dispatch(setMaxPrice(e.target.value))}
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
            onChange={(e) => dispatch(setSortOrder(e.target.value))}
          >
            <option value="default">by default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {sortedFilteredLiked.length === 0 ? (
        <p className="empty-favorites">
          No liked products found in selected filters.
        </p>
      ) : (
        <div className="product-grid">
          {localLoading ? (
            <ProductSkeleton />
          ) : (
            sortedFilteredLiked.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
