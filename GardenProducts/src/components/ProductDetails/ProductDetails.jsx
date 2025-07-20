import React, { useState, useEffect } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import './ProductDetails.scss';
import productImg from '../../media/5422e5af264f78b8a10da5d1979747d487daef24.png';
import heartIcon from '../../media/basket=like.svg';
import heartFilledIcon from '../../media/basket=liked.svg';

function ProductDetails() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [cartState, setCartState] = useState('default');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || []);
    setIsFavorite(favorites.includes(String(id)));
  }, [id]);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || []);
    if (isFavorite) {
      favorites = favorites.filter(favId => favId !== String(id));
    } else {
      favorites.push(String(id));
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };


 const product = useLoaderData();



  const handleDecrement = () => setCount((c) => (c > 1 ? c - 1 : 1));
  const handleIncrement = () => setCount((c) => c + 1);

  if (!product) return <div>Loading...</div>;

    const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.count += count;
    } else {
      cart.push({ id: product.id, count });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartState('added');
  };

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


  const DiscountBadgeInImage = hasDiscount && (
    <span className="product-discount">{`-${discount}%`}</span>
  );

  const DiscountBadgeInPrice = hasDiscount && (
    <span className="product-discount-inprice">{`-${discount}%`}</span>
  );

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

  const handleImageClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const ProductImage = (
    <img src={imageUrl} alt={product.title} className="product-image" onClick={handleImageClick} style={{cursor:  'pointer'}} />
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
    onClick={handleAddToCart}
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
<>
      {isModalOpen && (
      <div className="modal-overlay" onClick={handleModalClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <img src={imageUrl} alt={product.title} className="modal-img" />
          <button className="modal-close-btn" onClick={handleModalClose}>
            &times;
          </button>
        </div>
      </div>
    )}

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
    </>
  );
}

export default ProductDetails;
