import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increment, decrement, removeFromCart, clearCart } from '../../store/cartSlice';
import { setFirstOrderCompleted } from '../../store/saleFormSlice';
import { fetchProducts } from '../../Loader/fetchProducts';
import './Cart.scss';
import { backendUrl } from '../../apiConfig';

function Cart() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  console.log(dispatch);
  
  const cartItems = useSelector(state => state.cart.items);
  const isSaleFormActive = useSelector(state => state.saleForm?.isSaleFormActive);
  const hasFirstOrderCompleted = localStorage.getItem("hasFirstOrderCompleted") === "true";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      }
    };

    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', { form, cartItems });

    dispatch(clearCart());
    dispatch(setFirstOrderCompleted());
    setForm({ name: '', phone: '', email: '' });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderCartItem = (item) => {
    const productId = item.isDiscountItem ? item.originalId : item.id;
    const product = products.find(p => p.id === productId);

    if (!product) return null;

    const imageUrl = product.image?.startsWith('/')
      ? `${backendUrl}${product.image}`
      : product.image;

    return (
      <div className="cart-item" key={item.id}>
        <img src={imageUrl} alt={product.title} className="cart-item__img" />

        {/* Бейдж скидки */}
        {item.isDiscountItem && (
          <div className="discount-badge">Daily Deal -50%</div>
        )}

        <div className="cart-item__info">
          <Link to={`/categories/${product.categoryId}/product/${product.id}`} className="cart-item__title-link">
            <div className="cart-item__title">{product.title}</div>
          </Link>

          <div className="cart-item__row">
            {/* Блокируем счетчик для скидочных товаров */}
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
                  <span className="cart-item__price">${item.discountPrice.toFixed(2)}</span>
                  <span className="cart-item__old-price">${item.originalPrice.toFixed(2)}</span>
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
  };

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.isDiscountItem) {
      return sum + item.discountPrice;
    }

    const product = products.find(p => p.id === item.id);
    if (!product) return sum;

    const price = product.discont_price || product.price;
    return sum + (price * item.count);
  }, 0);

  // Скидка только если форма активна и первый заказ не завершён
  const discount = (isSaleFormActive && !hasFirstOrderCompleted) ? subtotal * 0.05 : 0;
  const totalSum = subtotal - discount;

  if (cartItems.length === 0) {
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
        <div className="empty-cart">
          <p>Looks like you have no items in your basket currently.</p>
          <Link to="/">
            <button className="continue-btn">
              Continue Shopping
            </button>
          </Link>
        </div>
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
          {cartItems.map(renderCartItem)}
        </div>
        <div className="order-details">
          <h3>Order details</h3>
          <p>{cartItems.length} items</p>

          {/* Показываем детали расчета */}
          {(isSaleFormActive && !hasFirstOrderCompleted) && (
            <div className="price-breakdown">
              <div className="subtotal-line">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="discount-line">
                <span>🎉 First order discount (5%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Итоговая сумма всегда одна */}
          <div className="total-sum">
            <p>Total</p>
            <span className="sum">
              ${totalSum.toFixed(2)}
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
        <div className="cart-modal-overlay" onClick={closeModal}>
          <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cart-modal-close" onClick={closeModal}>×</button>
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