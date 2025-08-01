import React from 'react';
import './QuantityControls.scss';

export default function QuantityControls({ count, onDecrement, onIncrement }) {
  return (
    <div className="quantity-controls">
      <button className="quantity-btn quantity-btn-minus" onClick={onDecrement}>-</button>
      <span className="quantity-value">{count}</span>
      <button className="quantity-btn quantity-btn-plus" onClick={onIncrement}>+</button>
    </div>
  );
}