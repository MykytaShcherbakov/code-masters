import React, { useEffect, useState } from 'react';
import './Sales.css';

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
      <div className="container">
        <div className="header">
          <h1 className="sale">Sale</h1>
          <div className="header-line-between"></div>
       
          <button className="header-all-sales-button">All sales</button>
        </div>

        <div className="product-grid">
          {randomSales.map((product) => (
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

              <div className="card-icons">
                <svg
                  width="48"
                  height="106"
                  viewBox="0 0 48 106"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M39.4 25.2222C42.678 22.14 46 18.4456 46 13.6111C46 10.5317 44.7252 7.57832 42.456 5.40082C40.1868 3.22331 37.1091 2 33.9 2C30.028 2 27.3 3.05556 24 6.22222C20.7 3.05556 17.972 2 14.1 2C10.8909 2 7.8132 3.22331 5.54401 5.40082C3.27482 7.57832 2 10.5317 2 13.6111C2 18.4667 5.3 22.1611 8.6 25.2222L24 40L39.4 25.2222Z"
                    fill="white"
                    stroke="#424436"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M40.5 71H7L3 105H44.5L40.5 71Z" fill="white" />
                  <path
                    d="M24 58C18.4961 58 14.0565 62.3737 14.0565 67.7959V69.7551H6.19492L6.10169 70.6122L2.12429 104.898L2 106H46L45.8757 104.898L41.8983 70.6122L41.8051 69.7551H33.9435V67.7959C33.9435 62.3737 29.5039 58 24 58ZM24 59.9592C28.4396 59.9592 31.9548 63.4222 31.9548 67.7959V69.7551H16.0452V67.7959C16.0452 63.4222 19.5604 59.9592 24 59.9592ZM7.99717 71.7143H14.0565V73.949C13.4622 74.2895 13.0621 74.9094 13.0621 75.6327C13.0621 76.7156 13.9516 77.5918 15.0508 77.5918C16.1501 77.5918 17.0395 76.7156 17.0395 75.6327C17.0395 74.9094 16.6395 74.2895 16.0452 73.949V71.7143H31.9548V73.949C31.3605 74.2895 30.9605 74.9094 30.9605 75.6327C30.9605 76.7156 31.8499 77.5918 32.9492 77.5918C34.0484 77.5918 34.9379 76.7156 34.9379 75.6327C34.9379 74.9094 34.5378 74.2895 33.9435 73.949V71.7143H40.0028L43.7627 104.041H4.23729L7.99717 71.7143Z"
                    fill="#424436"
                  />
                </svg>
              </div>

              <p className="product-name">{product.title}</p>
              <div className="prices">
                <span className="current-price">${product.discont_price}</span>
                <span className="original-price">${product.price}</span>
              </div>
            </div>
          ))}
        </div>

    
        <div className="all-sales-button-container">
          <button className="all-sales-button">All sales</button>
        </div>
      </div>
    </section>
  );
};

export default Sales;
