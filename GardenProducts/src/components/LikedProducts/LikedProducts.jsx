import React, { useState, useEffect } from 'react';
import './LikedProducts.scss';
import { useLoaderData, Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

export default function LikedProducts() {
  const products = useLoaderData() || [];

  const [likedProducts, setLikedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const filtered = products.filter(
      (product) => favorites.includes(String(product.id)) 
    );
    setLikedProducts(filtered);
  }, [products]);

  const discountedProducts = likedProducts.filter(
    (product) => product.discont_price !== null
  );

  const min = parseFloat(minPrice) || 0;
  const max = parseFloat(maxPrice) || Infinity;

  const priceFilteredProducts = discountedProducts.filter((product) => {
    const price = product.discont_price;
    return price >= min && price <= max;
  });

  let sortedProducts = [...priceFilteredProducts];

  if (sortOrder === 'price-asc') {
    sortedProducts.sort((a, b) => a.discont_price - b.discont_price);
  } else if (sortOrder === 'price-desc') {
    sortedProducts.sort((a, b) => b.discont_price - a.discont_price);
  }

  return (
    <div>
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/" className="breadcrumb-text">
            Main page
          </Link>
          <span className="breadcrumb-linie"></span>
          <span className="breadcrumb-text-2">Liked products</span>
        </div>

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

        {sortedProducts.length === 0 ? (
          <p className="empty-favorites">
            No liked products found in selected filters.
          </p>
        ) : (
          <div className="product-grid">
            {sortedProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
