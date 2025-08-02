import React from 'react';
import './ProductModal.scss';
export default function ProductModal({ imageUrl, title, onClose }) {
  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={e => e.stopPropagation()}>
        <img src={imageUrl} alt={title} className="product-modal-img" />
        <button className="product-modal-close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}