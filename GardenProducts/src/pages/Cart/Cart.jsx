import React, { useEffect, useState } from 'react';
import './Cart.scss';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, removeFromCart, setCart, clearCart } from '../../store/cartSlice';

function Cart() {
  const products = useLoaderData();
  const dispatch = useDispatch();
  console.log(dispatch);
  
  const cartItems = useSelector(state => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const local = localStorage.getItem('cart');
      if (local) {
        const parsedCart = JSON.parse(local);
        if (parsedCart && parsedCart.length > 0 && cartItems.length === 0) {
          dispatch(setCart(parsedCart));
        }
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      localStorage.removeItem('cart');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const mergedItems = cartItems
    .map(item => {
      const product = products.find(p => p.id === item.id);
      return product ? { ...product, count: item.count } : null;
    })
    .filter(Boolean);

  const renderCartItem = (item) => {
    const imageUrl = item.image?.startsWith('/')
      ? `http://localhost:3333${item.image}`
      : item.image;

    return (
      <div className="cart-item" key={item.id}>
        <img src={imageUrl} alt={item.title} className="cart-item__img" />
        <div className="cart-item__info">
          <Link to={`/product/${item.id}`} className="cart-item__title-link">
            <div className="cart-item__title">{item.title}</div>
          </Link>
          <div className="cart-item__row">
            <div className="cart-item__controls">
              <button onClick={() => dispatch(decrement(item.id))}>-</button>
              <span>{item.count}</span>
              <button onClick={() => dispatch(increment(item.id))}>+</button>
            </div>
            <div className="cart-item__prices">
              <span className="cart-item__price">${(item.discont_price || item.price).toFixed(2)}</span>
              {item.discont_price && (
                <span className="cart-item__old-price">${item.price.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
        <button
          className="cart-item__remove"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          &times;
        </button>
      </div>
    );
  };

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsModalOpen(true);
    dispatch(clearCart());
    setForm({
      name: '',
      phone: '',
      email: '',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (mergedItems.length === 0 && !isModalOpen) {
    return (
      <div className="empty-cart">
        <div className="empty-cart__header">
          <h2>Shopping cart</h2>
          <span className="header-divider"></span>
          <Link to={'/'}>
            <button className="breadcrumb-btn">
              Back to the store
            </button>
          </Link>
        </div>
        <p>
          Looks like you have no items in your basket currently.
        </p>
        <Link to={'/'}>
            <button className="continue-btn">
          Continue Shopping
        </button>
          </Link>
        <Link to={'/'}><button className="breadcrumb-btn-bottom">
          Back to the store
        </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <h2>Shopping cart</h2>
        <span className="header-divider"></span>
        <Link to={'/'}>
          <button className="breadcrumb-btn">
            Back to the store
          </button>
        </Link>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {mergedItems.map(renderCartItem)}
        </div>
        <div className="order-details">
          <h3>Order details</h3>
          <p>{mergedItems.length} items</p>
          <div className="total-sum">
            <p>Total</p>
            <span className="sum">
              ${mergedItems.reduce(
                (sum, item) => sum + (item.discont_price || item.price) * item.count,
                0
              ).toFixed(2)}
            </span>
          </div>
          <form className="order-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <button className="order-btn" type="submit">
              Order
            </button>
          </form>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>Congratulations!</h2>
            <p>Your order has been successfully placed on the website.</p>
            <p>A manager will contact you shortly to confirm your order.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;