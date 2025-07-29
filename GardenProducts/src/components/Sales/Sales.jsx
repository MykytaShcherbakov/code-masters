import React, { useEffect, useState } from 'react';
import './Sales.scss';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { backendUrl } from '../../apiConfig';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await fetch(`${backendUrl}/products/all`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setSales(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  if (loading) {
    return (
      <section className="sales-section">
        <div>Loading... Please wait</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="sales-section">
        <div>Error while loading: {error.message}</div>
      </section>
    );
  }

  const filteredSales = sales.filter(
    (product) => product.discont_price !== null
  );

  if (filteredSales.length === 0) {
    return (
      <section className="sales-section">
        <div>No products on sale</div>
      </section>
    );
  }

  const randomSales = [...filteredSales]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <section className="sales-section">
        <div className="header">
          <h1 className="sale">Sale</h1>
          <div className="header-line-between"></div>

        <Link to={'/discounted-items'}>
          <button className="header-all-sales-button">All sales</button>
        </Link>
      </div>

        <div className="product-grid-sales">
          {randomSales.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        <div className="all-sales-button-container">
          <button className="all-sales-button">All sales</button>
        </div>
    </section>
  );
};

export default Sales;
