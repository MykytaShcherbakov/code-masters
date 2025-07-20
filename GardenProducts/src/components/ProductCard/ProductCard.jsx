// components/ProductCard.jsx
import React from 'react';
import { IoMdHeart } from 'react-icons/io';
import { GiShoppingBag } from 'react-icons/gi';
// import './ProductCard.scss'; // подключи, если нужно кастомное оформление

const ProductCard = ({ product }) => {
  const hasDiscount = product.discont_price !== null;
  const currentPrice = hasDiscount ? product.discont_price : product.price;

  return (
    <div className="product-card">
      <img src={`http://localhost:3333${product.image}`} alt={product.title} />

      {hasDiscount && (
        <div className="discount-badge">
          -
          {Math.round(
            ((product.price - product.discont_price) / product.price) * 100
          )}
          %
        </div>
      )}

      <div className="card-icons">
        <IoMdHeart className="heart-icon-sales" />
        <GiShoppingBag className="shopping-bag-icon-sales" />
      </div>

      <p className="product-name">{product.title}</p>
      <div className="prices">
        <span className="current-price">${currentPrice.toFixed(2)}</span>
        {hasDiscount && (
          <span className="original-price">${product.price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;