import React, { useEffect, useState } from 'react';
import './Sales.scss';
import { Link } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';
import { IoMdHeart } from 'react-icons/io';
import ProductCard from '../ProductCard/ProductCard';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await fetch('http://localhost:3333/products/all');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setSales(data);
        console.log();
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
        <div className="container">Loading... Please wait</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="sales-section">
        <div className="container">Error while loading: {error.message}</div>
      </section>
    );
  }

  const filteredSales = sales.filter(
    (product) => product.discont_price !== null
  );

  if (filteredSales.length === 0) {
    return (
      <section className="sales-section">
        <div className="container">No products on sale</div>
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

        <div className="product-grid">
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
