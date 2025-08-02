import "./CartModal.scss";

export default function CartModal({ closeModal }) {
  return (
    <div className="cart-modal-overlay" onClick={closeModal}>
      <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
        <button className="cart-modal-close" onClick={closeModal}>×</button>
        <h2>Congratulations!</h2>
        <p>Your order has been successfully placed on the website.</p>
        <p>A manager will contact you shortly to confirm your order.</p>
      </div>
    </div>
  );
}