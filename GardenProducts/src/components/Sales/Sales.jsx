import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { backendUrl } from '../../apiConfig';
import './Sales.scss';

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
      <section className="sales-section-sales">
        <div>Loading... Please wait</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="sales-section-sales">
        <div>Error while loading: {error.message}</div>
      </section>
    );
  }

  const filteredSales = sales.filter(
    (product) => product.discont_price !== null
  );

  if (filteredSales.length === 0) {
    return (
      <section className="sales-section-sales">
        <div>No products on sale</div>
      </section>
    );
  }

  const randomSales = [...filteredSales]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <section className="sales-section-sales">
      <div className="container-sales">
        <div className="header-sales">
          <h1 className="sale-sales">Sale</h1>
          <div className="header-line-between-sales"></div>

          <Link to={'/discounted-items'}>
            <button className="header-all-sales-button-sales">All sales</button>
          </Link>
        </div>

        <div className="product-grid-sales-sales">
          {randomSales.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        <div className="all-sales-button-container-sales">
          <Link to={'/discounted-items'}>
            <button className="all-sales-button-sales">All sales</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sales;