import React, { useState, useEffect } from 'react';
import { IoMdHeart } from 'react-icons/io';
import { GiShoppingBag } from 'react-icons/gi';
import { Link, useLoaderData } from 'react-router-dom';
import './ProductCard.scss';

const ProductCard = ({ product,categories }) => {
  const hasDiscount = product.discont_price !== null;
  const currentPrice = hasDiscount ? product.discont_price : product.price;

  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  console.log(categories);
  console.log(product);
  
  
  

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsLiked(favorites.includes(String(product.id)));

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const inCart = cart.some((item) => String(item.id) === String(product.id));
    setIsInCart(inCart);
  }, [product.id]);

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
    } else {
     
      cart = cart.filter((item) => String(item.id) !== productIdStr);
      localStorage.setItem('cart', JSON.stringify(cart));
      setIsInCart(false);
    }
  };

  return (
    <Link className="link-product" to={`/categories/${product.categoryId}/product/${product.id}`}>
      <div className="product-card">
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
        />

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
          {isLiked ? (
            <IoMdHeart
              className="heart-icon-sales green"
              onClick={handleHeartClick}
            />
          ) : (
            <IoMdHeart
              className="heart-icon-sales"
              onClick={handleHeartClick}
            />
          )}

          <GiShoppingBag
            className={`shopping-bag-icon-sales ${isInCart ? 'green' : ''}`}
            onClick={handleAddToCart}
          />
        </div>
     
        <p className="product-name">{product.title}</p>
        <div className="prices">
          <span className="current-price">${currentPrice.toFixed(2)}</span>
          {hasDiscount && (
            <span className="original-price">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
