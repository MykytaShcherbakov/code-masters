import React, { useEffect } from 'react';
import {
  useLoaderData,
  useParams,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductSkeleton from '../../components/ProductSkeleton/ProductSkeleton';
import useSkeletonLoader from '../../components/ProductSkeleton/useSkeletonLoader';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CategorieProducts.scss';

import {
  setProducts,
  setMinPrice,
  setMaxPrice,
  setSortOrder,
  setShowDiscountedOnly,
  selectSortedProducts,
  selectCategoryProducts,
} from '../../store/productsSlice';

export default function CategorieProducts() {
  const { categoryId } = useParams();
  const { products: loadedProducts, category } = useLoaderData();
  const location = useLocation();
  const localLoading = useSkeletonLoader(100);

  const dispatch = useDispatch();
  const minPrice = useSelector((state) => state.products.minPrice);
  const maxPrice = useSelector((state) => state.products.maxPrice);
  const sortOrder = useSelector((state) => state.products.sortOrder);
  const showDiscountedOnly = useSelector(
    (state) => state.products.showDiscountedOnly
  );

  const sortedAndFilteredCategoryProducts = useSelector((state) =>
    selectSortedProducts(
      state,
      (innerState) => selectCategoryProducts(innerState, categoryId),
      showDiscountedOnly
    )
  );

  useEffect(() => {
    if (Array.isArray(loadedProducts) && loadedProducts.length > 0) {
      dispatch(setProducts(loadedProducts));
    }
  }, [dispatch, loadedProducts]);

  const isProductPage = location.pathname.includes('/product/');

  if (isProductPage) {
    return <Outlet />;
  }

  return (
    <div className="container">
      <h1 className="page-title">
        {category ? category.title : 'Category Products'}
      </h1>
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

        <div className="checkbox-container">
          <label className="checkbox-label" htmlFor="discounted-items">
            Discounted items
          </label>
          <input
            className="checkbox-input"
            type="checkbox"
            id="discounted-items"
            checked={showDiscountedOnly}
            onChange={(e) => dispatch(setShowDiscountedOnly(e.target.checked))}
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

      <div className="product-grid">
        {localLoading ? (
          <ProductSkeleton />
        ) : sortedAndFilteredCategoryProducts.length > 0 ? (
          sortedAndFilteredCategoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
  );
}