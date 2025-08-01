import React from 'react';

function AddToCartBtn({ onClick, cartState }) {
  return (
    <button
      className={`add-to-cart-btn ${cartState}`}
      onClick={onClick}
      disabled={cartState === 'added'}
    >
      {cartState === 'added' ? 'Added' : 'Add to cart'}
    </button>
  );
}

export default AddToCartBtn;