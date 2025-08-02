import React, { useState, useEffect } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import './ProductDetails.scss';
import productImg from '../../media/5422e5af264f78b8a10da5d1979747d487daef24.png';
import { backendUrl } from '../../apiConfig';
import QuantityControls from './parts/QuantityControls';
import AddToCartBtn from './parts/AddToCartBtn';
import PriceBlock from './parts/PriceBlock';
import DescriptionBlock from './parts/DescriptionBlock';
import FavoriteButton from './parts/FavoriteButton';
import ProductImage from './parts/ProductImage';
import ProductModal from './parts/ProductModal';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

function ProductDetails() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const [isFavorite, setIsFavorite] = useState(false);
  const [count, setCount] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [cartState, setCartState] = useState('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const product = useLoaderData();

  if (!product || Number(product.id) !== Number(id)) {
    return <NotFoundPage />;
  }

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');
      setIsFavorite(favorites.includes(String(id)));
    } catch {
      setIsFavorite(false);
    }
  }, [id]);

  useEffect(() => {
    const isInCart = cartItems.some(item => item.id === parseInt(id));
    setCartState(isInCart ? 'added' : 'default');
  }, [cartItems, id]);

  const handleFavorite = () => {
    try {
      let favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');
      if (isFavorite) {
        favorites = favorites.filter(favId => favId !== String(id));
      } else {
        favorites.push(String(id));
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch {
      console.error('Ошибка при работе с избранным');
    }
  };

  const handleDecrement = () => setCount(c => (c > 1 ? c - 1 : 1));
  const handleIncrement = () => setCount(c => c + 1);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      count,
      hasDiscount: false,
      discountPrice: null,
      originalPrice: null,
      isDailyDeal: false
    };

    dispatch(addToCart(cartItem));
    setCartState('added');
  };

  const hasDiscount = product.discont_price && product.discont_price < product.price;
  const discount = hasDiscount
    ? Math.round(((product.price - product.discont_price) / product.price) * 100)
    : 0;

  const imageUrl = product.image?.startsWith('/')
    ? `${backendUrl}${product.image}`
    : product.image || productImg;

  const descLimit = 220;
  const isLongDesc = product.description?.length > descLimit;
  const descToShow = showFullDesc || !isLongDesc
    ? product.description
    : `${product.description.slice(0, descLimit)}...`;

  const DiscountBadgeInImage = hasDiscount && (
    <span className="product-discount">{`-${discount}%`}</span>
  );

  const DiscountBadgeInPrice = hasDiscount && (
    <span className="product-discount-inprice">{`-${discount}%`}</span>
  );

  const handleImageClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <ProductModal
          imageUrl={imageUrl}
          title={product.title}
          onClose={handleModalClose}
        />
      )}

      <section className="product-info-section mobile-only">
        <div className="product-info">
          <div className="product-header before768">
            <h3 className="product-title">{product.title}</h3>
            <FavoriteButton isFavorite={isFavorite} onClick={handleFavorite} />
          </div>

          <div className="product-main-block">
            <div className="product-img-block">
              <ProductImage
                src={imageUrl}
                alt={product.title}
                onClick={handleImageClick}
              />
              {DiscountBadgeInImage}
            </div>

            <div className="product-purchase-block">
              <div className="product-header after480">
                <h3 className="product-title">{product.title}</h3>
                <FavoriteButton isFavorite={isFavorite} onClick={handleFavorite} />
              </div>

              <PriceBlock
                price={product.price}
                discountPrice={product.discont_price}
                discountPercent={discount}
                hasDiscount={hasDiscount}
              />

              <div className="product-quantity-cart">
                <QuantityControls
                  count={count}
                  onDecrement={handleDecrement}
                  onIncrement={handleIncrement}
                />
                <div className="after768">
                  <AddToCartBtn state={cartState} onClick={handleAddToCart} />
                </div>
              </div>

              <div className="before768">
                <AddToCartBtn state={cartState} onClick={handleAddToCart} />
              </div>
              <DescriptionBlock
                descToShow={descToShow}
                isLongDesc={isLongDesc}
                showFullDesc={showFullDesc}
                setShowFullDesc={setShowFullDesc}
                blockClass="desc-tablet"
              />
            </div>
          </div>

          <DescriptionBlock
            descToShow={descToShow}
            isLongDesc={isLongDesc}
            showFullDesc={showFullDesc}
            setShowFullDesc={setShowFullDesc}
            blockClass="desc-mobile"
          />
        </div>
      </section>
    </>
  );
}

export default ProductDetails;