import React from 'react';
import './ProductImage.scss';

export default function ProductImage({ src, alt, onClick }) {
  return (
    <img
      src={src}
      alt={alt}
      className="product-image"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    />
  );
}