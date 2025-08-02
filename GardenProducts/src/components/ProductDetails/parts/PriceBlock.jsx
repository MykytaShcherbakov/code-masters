import React from 'react';
import './PriceBlock.scss';
export default function PriceBlock({ price, discountPrice, discountPercent, hasDiscount }) {
  return (
    <div className="product-prices">
      <span className="product-price">
        ${hasDiscount ? discountPrice : price}
      </span>
      {hasDiscount && (
        <span className="old-price-discount-wrap">
          <span className="product-old-price">${price}</span>
          <span className="product-discount-inprice">-{discountPercent}%</span>
        </span>
      )}
    </div>
  );
}