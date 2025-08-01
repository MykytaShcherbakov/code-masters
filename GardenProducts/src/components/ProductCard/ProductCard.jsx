import React, { useState, useEffect } from 'react';
import { IoMdHeart } from 'react-icons/io';
import { GiShoppingBag } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/cartSlice';
import './ProductCard.scss';
import { backendUrl } from '../../apiConfig';
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const hasDiscount = product.discont_price !== null;
  const currentPrice = hasDiscount ? product.discont_price : product.price;

  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(
    cartItems.some((item) => item.id === product.id)
  );

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsLiked(favorites.includes(String(product.id)));

    const syncFavorites = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsLiked(updatedFavorites.includes(String(product.id)));
    };

    window.addEventListener('favoritesChanged', syncFavorites);
    return () => {
      window.removeEventListener('favoritesChanged', syncFavorites);
    };
  }, [product.id]);

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.id === product.id));
  }, [cartItems, product.id]);

  const handleHeartClick = (e) => {
    e.preventDefault();
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(String(product.id))) {
      favorites = favorites.filter((id) => id !== String(product.id));
      setIsLiked(false);
    } else {
      favorites.push(String(product.id));
      setIsLiked(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIdStr = String(product.id);

    const isAlreadyInCart = cart.some(
      (item) => String(item.id) === productIdStr
    );

    if (!isAlreadyInCart) {
      cart.push({ id: product.id, count: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      setIsInCart(true);

      const cartItem = {
        id: product.id,
        count: 1,
        hasDiscount,
        discountPrice: hasDiscount ? product.discont_price : null,
        originalPrice: product.price,
        isDailyDeal: false,
      };
      dispatch(addToCart(cartItem));
    } else {
      cart = cart.filter((item) => String(item.id) !== productIdStr);
      localStorage.setItem('cart', JSON.stringify(cart));
      setIsInCart(false);

      dispatch(removeFromCart(product.id));
    }
  };

  return (
    <Link
      className="link-product"
      to={`/categories/${product.categoryId}/product/${product.id}`}
    >
      <div className="product-card">
        <img src={`${backendUrl}${product.image}`} alt={product.title} />

        {hasDiscount && (
          <div className="discount-badge">
            -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
          </div>
        )}

        <div className="card-icons">
          <IoMdHeart
            className={`heart-icon-sales ${isLiked ? 'green' : ''}`}
            onClick={handleHeartClick}
          />
          <GiShoppingBag
            className={`shopping-bag-icon-sales ${isInCart ? 'green' : ''}`}
            onClick={handleAddToCart}
          />
        </div>
        <div className="product-card-details">
          <p className="product-name">{product.title}</p>
          <div className="prices">
            <span className="current-price">${currentPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="original-price">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;