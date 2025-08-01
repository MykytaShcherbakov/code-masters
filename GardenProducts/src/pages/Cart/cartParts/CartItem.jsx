import { Link } from "react-router-dom";
import "./CartItem.scss";

export default function CartItem({ item, product, increment, decrement, removeFromCart, backendUrl, dispatch }) {
  if (!product) return null;

  const imageUrl = product.image?.startsWith("/")
    ? `${backendUrl}${product.image}`
    : product.image;

  return (
    <div className="cart-item" key={item.id}>
      <img src={imageUrl} alt={product.title} className="cart-item__img" />

      {item.isDiscountItem && (
        <div className="discount-badge">Daily Deal -50%</div>
      )}

      <div className="cart-item__info">
        <Link
          to={`/categories/${product.categoryId}/product/${product.id}`}
          className="cart-item__title-link"
        >
          <div className="cart-item__title">{product.title}</div>
        </Link>

        <div className="cart-item__row">
          {item.isDiscountItem ? (
            <div className="cart-item__fixed-quantity">
              <span className="fixed-qty-label">1 (Daily Deal Offer)</span>
            </div>
          ) : (
            <div className="cart-item__controls">
              <button
                className="cart-item__btn"
                onClick={() => dispatch(decrement(item.id))}
              >
                -
              </button>
              <span className="cart-item__quantity">{item.count}</span>
              <button
                className="cart-item__btn"
                onClick={() => dispatch(increment(item.id))}
              >
                +
              </button>
            </div>
          )}

          <div className="cart-item__prices">
            {item.isDiscountItem ? (
              <>
                <span className="cart-item__price">
                  ${item.discountPrice.toFixed(2)}
                </span>
                <span className="cart-item__old-price">
                  ${item.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <>
                <span className="cart-item__price">
                  ${((product.discont_price || product.price) * item.count).toFixed(2)}
                </span>
                {product.discont_price && (
                  <span className="cart-item__old-price">
                    ${(product.price * item.count).toFixed(2)}
                  </span>
                )}
              </>
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
}