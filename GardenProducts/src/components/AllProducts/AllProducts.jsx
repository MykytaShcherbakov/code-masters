import React, { useState } from 'react';
import './AllProducts.scss';
import { useLoaderData, Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

export default function AllProducts() {
  const products = useLoaderData() || [];

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);

  const min = parseFloat(minPrice) || 0;
  const max = parseFloat(maxPrice) || Infinity;

  // 1. Фильтрация по цене
  const priceFilteredProducts = products.filter((product) => {
    const realPrice = product.discont_price ?? product.price;
    return realPrice >= min && realPrice <= max;
  });

  // 2. Фильтрация по скидке
  const discountedFilteredProducts = showDiscountedOnly
    ? priceFilteredProducts.filter((product) => product.discont_price !== null)
    : priceFilteredProducts;

  // 3. Сортировка
  let sortedProducts = [...discountedFilteredProducts];
  if (sortOrder === 'price-asc') {
    sortedProducts.sort((a, b) => {
      const priceA = a.discont_price ?? a.price;
      const priceB = b.discont_price ?? b.price;
      return priceA - priceB;
    });
  } else if (sortOrder === 'price-desc') {
    sortedProducts.sort((a, b) => {
      const priceA = a.discont_price ?? a.price;
      const priceB = b.discont_price ?? b.price;
      return priceB - priceA;
    });
  }

  return (
    <div className="container">
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-text">
              Main page
            </Link>
          </li>
          <li className="breadcrumb-separator" aria-hidden="true">
            <span className="breadcrumb-line" />
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-text-2">All products</span>
          </li>
        </ol>
      </nav>

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
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products-on-sale">No products on sale</p>
        )}
      </div>
    </div>
  );
}
