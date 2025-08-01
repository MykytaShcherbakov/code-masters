import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { increment, decrement, removeFromCart, clearCart } from '../../store/cartSlice';
import { setFirstOrderCompleted } from '../../store/saleFormSlice';
import { fetchProducts } from '../../Loader/fetchProducts';
import './Cart.scss';
import { backendUrl } from '../../apiConfig';
import EmptyCart from './cartParts/EmptyCart';
import CartItem from './cartParts/CartItem';
import OrderDetails from './cartParts/OrderDetails';
import CartModal from './cartParts/CartModal';

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

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.isDiscountItem) {
      return sum + item.discountPrice;
    }

    const product = products.find(p => p.id === item.id);
    if (!product) return sum;

    const price = product.discont_price || product.price;
    return sum + (price * item.count);
  }, 0);
  
  const discount = (isSaleFormActive && !hasFirstOrderCompleted) ? subtotal * 0.05 : 0;
  const totalSum = subtotal - discount;

  if (cartItems.length === 0) {
    return <EmptyCart />;
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
          {cartItems.map(item => {
            const productId = item.isDiscountItem ? item.originalId : item.id;
            const product = products.find(p => p.id === productId);
            return (
              <CartItem
                key={item.id}
                item={item}
                product={product}
                increment={increment}
                decrement={decrement}
                removeFromCart={removeFromCart}
                backendUrl={backendUrl}
                dispatch={dispatch}
              />
            );
          })}
        </div>
        <OrderDetails
          cartItems={cartItems}
          subtotal={subtotal}
          discount={discount}
          totalSum={totalSum}
          isSaleFormActive={isSaleFormActive}
          hasFirstOrderCompleted={hasFirstOrderCompleted}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

      {isModalOpen && <CartModal closeModal={closeModal} />}
    </div>
  );
}

export default Cart;