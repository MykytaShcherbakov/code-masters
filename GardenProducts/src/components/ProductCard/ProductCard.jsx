import React, { useState, useEffect } from 'react'
import './ProductCard.css'
import productImg from './5422e5af264f78b8a10da5d1979747d487daef24.png'
import heartIcon from './basket=like.svg'
import heartFilledIcon from './basket=liked.svg'

function ProductCard() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [count, setCount] = useState(1)
  const [product, setProduct] = useState(null)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [cartState, setCartState] = useState('default')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    fetch('http://localhost:3333/products/1')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProduct(data[0])
        else setProduct(data)
      })
      .catch(() => {
        setProduct({
          title: 'Secateurs',
          price: 199,
          discont_price: 240,
          image: productImg,
          description:
            'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. For comfort, the robust but lightweight alloy handles are covered in a soft grip, in a bright terracotta colour for maximum visibility in the garden. It won`t be easy to leave this pruner behind at the end of the day! Rubber cushion stops prevent jarring over repeated use, reducing hand strain for the user.',
        })
      })
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleFavorite = () => setIsFavorite((prev) => !prev)
  const handleDecrement = () => setCount((c) => (c > 1 ? c - 1 : 1))
  const handleIncrement = () => setCount((c) => c + 1)

  if (!product) return <div>Loading...</div>

const discount = product.discont_price
  ? Math.abs(Math.round(((product.discont_price - product.price) / product.discont_price) * 100))
  : 0

  const imageUrl = product.image?.startsWith('/')
    ? `http://localhost:3333${product.image}`
    : product.image || productImg

  // Логика для "Read more"
  const descLimit = 220
  const isLongDesc = product.description && product.description.length > descLimit
  const descToShow = showFullDesc || !isLongDesc
    ? product.description
    : product.description.slice(0, descLimit) + '...'

  // Мобильная разметка 360-479px
  if (windowWidth <= 479) {
    return (
      <section className="product-card-section">
        <div className="product-card">
          <div className="mobile-header">
            <h3 className="product-title mobile-title">{product.title}</h3>
            <button
              className={`favorite-btn mobile-favorite${isFavorite ? ' active' : ''}`}
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
          </div>
          <div className="product-img-block">
            <img
              src={imageUrl}
              alt={product.title}
              className="product-image"
            />
            {product.discont_price && (
              <span className="product-discount mobile-discount">-{discount}%</span>
            )}
          </div>
          <div className="product-prices">
            <span className="product-price">${product.price}</span>
            {product.discont_price && (
              <span className="old-price-discount-wrap">
                <span className="product-old-price">${product.discont_price}</span>
              </span>
            )}
          </div>
          <div className="product-quantity-cart">
            <div className="quantity-controls">
              <button className="quantity-btn quantity-btn-minus" onClick={handleDecrement}>-</button>
              <span className="quantity-value">{count}</span>
              <button className="quantity-btn quantity-btn-plus" onClick={handleIncrement}>+</button>
            </div>
          </div>
          <button
            className={`add-to-cart-btn ${cartState}`}
            onMouseEnter={() => cartState === 'default' && setCartState('hover')}
            onMouseLeave={() => cartState === 'hover' && setCartState('default')}
            onClick={() => setCartState('added')}
            disabled={cartState === 'added'}
          >
            {cartState === 'added' ? 'Added' : 'Add to cart'}
          </button>
          <div className="product-description-block mobile-description">
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
        </div>
      </section>
    )
  }

  // Мобильная разметка 480-767px
  if (windowWidth >= 480 && windowWidth <= 767) {
    return (
      <section className="product-card-section">
        <div className="product-card">
          <div className="mobile-header">
            <h3 className="product-title mobile-title">{product.title}</h3>
            <button
              className={`favorite-btn mobile-favorite${isFavorite ? ' active' : ''}`}
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
          </div>
          <div className="product-img-info-row">
            <div className="product-img-block">
              <img
                src={imageUrl}
                alt={product.title}
                className="product-image"
              />
              {product.discont_price && (
                <span className="product-discount mobile-discount">-{discount}%</span>
              )}
            </div>
            <div className="product-info">
              <div className="product-prices">
                <span className="product-price">${product.price}</span>
                {product.discont_price && (
                  <span className="old-price-discount-wrap">
                    <span className="product-old-price">${product.discont_price}</span>
                  </span>
                )}
              </div>
              <div className="product-quantity-cart">
                <div className="quantity-controls">
                  <button className="quantity-btn quantity-btn-minus" onClick={handleDecrement}>-</button>
                  <span className="quantity-value">{count}</span>
                  <button className="quantity-btn quantity-btn-plus" onClick={handleIncrement}>+</button>
                </div>
              </div>
              <button
                className={`add-to-cart-btn ${cartState}`}
                onMouseEnter={() => cartState === 'default' && setCartState('hover')}
                onMouseLeave={() => cartState === 'hover' && setCartState('default')}
                onClick={() => setCartState('added')}
                disabled={cartState === 'added'}
              >
                {cartState === 'added' ? 'Added' : 'Add to cart'}
              </button>
            </div>
          </div>
          <div className="product-description-block mobile-description">
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
        </div>
      </section>
    )
  }

  // Десктоп и другие размеры
  return (
    <section className="product-card-section">
      <div className="product-card">
        <div className="product-main-content">
          <div className="product-img-block">
            <img
              src={imageUrl}
              alt={product.title}
              className="product-image"
            />
          </div>
          <div className="product-info">
            <button
              className={`favorite-btn desktop-favorite${isFavorite ? ' active' : ''}`}
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
            <h3 className="product-title desktop-title">{product.title}</h3>
            <div className="product-prices">
              <span className="product-price">${product.price}</span>
              {product.discont_price && (
                <span className="old-price-discount-wrap">
                  <span className="product-old-price">${product.discont_price}</span>
                  <span className="product-discount desktop-discount">-{discount}%</span>
                </span>
              )}
            </div>
            <div className="product-quantity-cart">
              <div className="quantity-controls">
                <button className="quantity-btn quantity-btn-minus" onClick={handleDecrement}>-</button>
                <span className="quantity-value">{count}</span>
                <button className="quantity-btn quantity-btn-plus" onClick={handleIncrement}>+</button>
              </div>
              <button
                className={`add-to-cart-btn ${cartState}`}
                onMouseEnter={() => cartState === 'default' && setCartState('hover')}
                onMouseLeave={() => cartState === 'hover' && setCartState('default')}
                onClick={() => setCartState('added')}
                disabled={cartState === 'added'}
              >
                {cartState === 'added' ? 'Added' : 'Add to cart'}
              </button>
            </div>
            <div className="product-description-block desktop-description">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCard