import "./OrderDetails.scss";

export default function OrderDetails({
  cartItems,
  subtotal,
  discount,
  totalSum,
  isSaleFormActive,
  hasFirstOrderCompleted,
  form,
  handleChange,
  handleSubmit
}) {
  return (
    <div className="order-details">
      <h3>Order details</h3>
      <p>{cartItems.length} items</p>

      {(isSaleFormActive && !hasFirstOrderCompleted) && (
        <div className="price-breakdown">
          <div className="subtotal-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="discount-line">
            <span>First order discount (5%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        </div>
      )}

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
  );
}