import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import {
  setProducts,
  setMinPrice,
  setMaxPrice,
  setSortOrder,
  setShowDiscountedOnly,
  selectSortedProducts,
  selectProducts, 
} from '../../store/productsSlice';
import './AllProducts.scss';

export default function AllProducts() {
  const dispatch = useDispatch();
  const loadedProducts = useLoaderData() || [];

  useEffect(() => {
    if (Array.isArray(loadedProducts) && loadedProducts.length > 0) {
      dispatch(setProducts(loadedProducts));
    }
  }, [dispatch, loadedProducts]);

  const minPrice = useSelector((state) => state.products.minPrice);
  const maxPrice = useSelector((state) => state.products.maxPrice);
  const sortOrder = useSelector((state) => state.products.sortOrder);
  const showDiscountedOnly = useSelector(
    (state) => state.products.showDiscountedOnly
  );

  const sortedAndFilteredProducts = useSelector((state) =>
    selectSortedProducts(state, (innerState) => {
      const allProds = selectProducts(innerState);
      return showDiscountedOnly
        ? allProds.filter((product) => product.discont_price !== null)
        : allProds;
    })
  );

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
        {sortedAndFilteredProducts.length > 0 ? (
          sortedAndFilteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products-on-sale">No products on sale</p>
        )}
      </div>
    </div>
  );
}
