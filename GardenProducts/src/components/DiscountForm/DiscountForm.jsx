import "./DiscountForm.css";

const DiscountForm = () => {
  return (
    <div className="discount-form">
      <div className="discount-inner">
        <div className="discount-title">
          <h2>5% off on the first order</h2>
        </div>
        <div className="discount-content">
          <img
            src="../../../public/Pictures/Discount/discount-image.png"
            alt="discount-image"
          />
          <div className="discount-fields">
            <div className="discount-inputs">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Phone Number" />
              <input type="text" placeholder="Email" />
            </div>
            <div className="discount-btn">
              <button>Get a discount</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountForm;
