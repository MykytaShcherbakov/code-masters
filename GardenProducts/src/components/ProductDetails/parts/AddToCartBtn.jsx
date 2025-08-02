import React from 'react';
import './AddToCartBtn.scss';

export default function AddToCartBtn({ state, onClick }) {
  return (
    <button
      className={`add-to-cart-btn ${state}`}
      onClick={onClick}
      disabled={state === 'added'}
    >
      {state === 'added' ? 'Added' : 'Add to cart'}
    </button>
  );
}