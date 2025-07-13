import React from 'react';
import './ProductCard.css'; // The CSS file is correctly named ProductCard.css

const ProductCard = () => {
  // Function name changed to ProductCard
  return (
    <div className="product-page">
      <header className="navbar">
        <nav>
          <ul>
            <li>
              <a href="#main-page">Main page</a>
            </li>
            <li>
              <a href="#categories">Categories</a>
            </li>
            <li>
              <a href="#tools-equipment">Tools and equipment</a>
            </li>
            <li className="active">
              <a href="#secateurs">Secateurs</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="product-details-container">
        <div className="product-image-section">
          <img
            src="/path/to/your/secateurs-image.jpg" // Replace with the actual path to your image
            alt="Secateurs"
            className="product-main-image"
          />
          {/* The 780x572 box is an overlay for dimension display, not part of the product image itself */}
          <div className="image-dimensions-overlay">780 x 572</div>
        </div>

        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-title">Secateurs</h1>
            <button className="favorite-button" aria-label="Add to favorites">
             
            </button>
          </div>

          <div className="price-section">
            <span className="current-price">$199</span>
            <span className="old-price">$240</span>
            <span className="discount-badge">-17%</span>
          </div>

          <div className="quantity-selector">
            <button className="quantity-btn">-</button>
            <span className="quantity-display">1</span>
            <button className="quantity-btn">+</button>
          </div>

          <button className="add-to-cart-btn">Add to cart</button>

          <div className="product-description">
            <h2>Description</h2>
            <p>
              This high quality everyday secateur features a fully hardened and
              tempered, high-carbon steel blade for lasting sharpness. For
              comfort, the robust but lightweight alloy handles are covered in a
              soft grip. in a bright terracotta colour for maximum visibility in
              the garden. It won't be easy to leave this pruner behind at the
              end of the day! Rubber cushion stops prevent jarring over repeated
              use, reducing hand strain for the user.
            </p>
            <p>
              This secateur cuts up to 2.5 cm diameter. Carrying RHS
              endorsement, possibly the highest accolade in gardening, for peace
              of mind this pruner comes with a ten-year guarantee against man.
            </p>
            <a href="#read-more" className="read-more">
              Read more
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductCard; // Exporting the new function name
