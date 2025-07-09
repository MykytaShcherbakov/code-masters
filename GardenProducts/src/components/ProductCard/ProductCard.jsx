import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductCard.scss';
import productImg from './5422e5af264f78b8a10da5d1979747d487daef24.png';
import heartIcon from './basket=like.svg';
import heartFilledIcon from './basket=liked.svg';

function ProductCard() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [cartState, setCartState] = useState('default');

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3333/products/${id}`);
        const data = await res.json();
        setProduct(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  const handleFavorite = () => setIsFavorite((prev) => !prev);
  const handleDecrement = () => setCount((c) => (c > 1 ? c - 1 : 1));
  const handleIncrement = () => setCount((c) => c + 1);

  if (!product) return <div>Loading...</div>;

  const hasDiscount = product.discont_price && product.discont_price < product.price;
  const discount = hasDiscount
    ? Math.round(((product.price - product.discont_price) / product.price) * 100)
    : 0;

  const imageUrl = product.image?.startsWith('/')
    ? `http://localhost:3333${product.image}`
    : product.image || productImg;

  const descLimit = 220;
  const isLongDesc = product.description?.length > descLimit;
  const descToShow = showFullDesc || !isLongDesc
    ? product.description
    : product.description?.slice(0, descLimit) + '...';

  // ----- СКИДОЧНЫЕ КОНСТАНТЫ -----

  // В углу картинки (планшет)
  const DiscountBadgeInImage = hasDiscount && (
    <span className="product-discount">{`-${discount}%`}</span>
  );

  // В блоке цен (мобилка)
  const DiscountBadgeInPrice = hasDiscount && (
    <span className="product-discount-inprice">{`-${discount}%`}</span>
  );

  // ----- Favorite -----

  const FavoriteButton = (
    <button
      className={`favorite-btn${isFavorite ? ' active' : ''}`}
      onClick={handleFavorite}
      aria-label="Add to favorites"
    >
      <img
        src={isFavorite ? heartFilledIcon : heartIcon}
        alt="Favorite"
        width={28}
        height={28}
      />
    </button>
  );

  const ProductImage = (
    <img src={imageUrl} alt={product.title} className="product-image" />
  );

  const PriceBlock = (
    <div className="product-prices">
      <span className="product-price">
        ${hasDiscount ? product.discont_price : product.price}
      </span>
      {hasDiscount && (
        <span className="old-price-discount-wrap">
          <span className="product-old-price">${product.price}</span>
          {DiscountBadgeInPrice}
        </span>
      )}
    </div>
  );

  const QuantityControls = (
    <div className="quantity-controls">
      <button className="quantity-btn quantity-btn-minus" onClick={handleDecrement}>-</button>
      <span className="quantity-value">{count}</span>
      <button className="quantity-btn quantity-btn-plus" onClick={handleIncrement}>+</button>
    </div>
  );

  const AddToCartBtn = (
    <button
      className={`add-to-cart-btn ${cartState}`}
      onClick={() => setCartState('added')}
      disabled={cartState === 'added'}
    >
      {cartState === 'added' ? 'Added' : 'Add to cart'}
    </button>
  );

  const DescriptionBlock = (blockClass) => (
    <div className={`product-description-block ${blockClass}`}>
      <h4 className="product-description-title">Description</h4>
      <p className="product-description">
        {descToShow}
        {isLongDesc && !showFullDesc && (
          <button
            className="read-more-btn"
            onClick={() => setShowFullDesc(true)}
          >
            Read more
          </button>
        )}
      </p>
    </div>
  );

  // ----- RETURN -----

  return (
    <section className="product-card-section mobile-only">
      <div className="product-card">

        {/* Заголовок для мобильных */}
        <div className="product-header before768">
          <h3 className="product-title">{product.title}</h3>
          {FavoriteButton}
        </div>

        <div className="product-main-block">
          <div className="product-img-block">
            {ProductImage}
            {DiscountBadgeInImage}
          </div>
          <div className="product-purchase-block">
            {/* Заголовок для адаптива 481–768 */}
            <div className="product-header after480">
              <h3 className="product-title">{product.title}</h3>
              {FavoriteButton}
            </div>
            {PriceBlock}
            <div className="product-quantity-cart">
              {QuantityControls}
              <div className="after768">{AddToCartBtn}</div>
            </div>
            <div className="before768">{AddToCartBtn}</div>
            {DescriptionBlock("desc-tablet")}
          </div>
        </div>

        {DescriptionBlock("desc-mobile")}
      </div>
    </section>
  );
}

export default ProductCard;
