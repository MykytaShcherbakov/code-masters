import React, { useState } from 'react';
import './ProductsFromCategory.scss';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';
import { IoMdHeart } from 'react-icons/io';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductsFromCategory() {
  const products = useLoaderData() || [];

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
          <div className="breadcrumb-linie"></div>

          <Link to="/categories" className="breadcrumb-text">
            Categories
          </Link>
          <div className="breadcrumb-linie"></div>
          <span className="breadcrumb-text-2">Tools and equipment</span>
        </div>

        <h1 className="page-title">Tools and equipment</h1>

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
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
