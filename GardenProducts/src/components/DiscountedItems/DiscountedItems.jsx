import React, { useState, useMemo } from 'react';
import './DiscountedItems.css';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function DiscountedItems() {
  const products = useLoaderData();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const discountedProducts = products.filter(
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

  // if (priceFilteredProducts.length === 0) {
  //   return <h1 className='no-products-on-sale'>No Products on sale</h1>;
  // }


  return (
    <div>
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/" className="breadcrumb-text">
            Main page
          </Link>
          <span className="breadcrumb-linie"></span>
          <span className="breadcrumb-text-2">All sales</span>
        </div>

        <h1 className="page-title">Discounted items</h1>

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

        <div className="product-grid">
          {sortedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />
              <div className="discount-badge">
                -
                {Math.round(
                  ((product.price - product.discont_price) / product.price) *
                    100
                )}
                %
              </div>
              <p className="product-name">{product.title}</p>
              <div className="prices">
                <span className="current-price">${product.discont_price}</span>
                <span className="original-price">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
