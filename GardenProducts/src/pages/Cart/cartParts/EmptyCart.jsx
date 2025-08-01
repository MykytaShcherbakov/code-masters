import { Link } from 'react-router-dom';
import "./EmptyCart.scss";
export default function EmptyCart() {
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