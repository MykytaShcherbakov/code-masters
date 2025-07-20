import { IoCloseOutline } from "react-icons/io5";
import "./DiscountInfoModal.scss";

const DiscountInfoModal = ({ onClose }) => {
  return (
    <div className="info-modal__overlay">
      <div className="info-modal__window">
        <div className="info-modal__header">
          <h3 className="info-modal__title">You have already received a discount today!</h3>
          <IoCloseOutline className="info-modal__close-icon" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default DiscountInfoModal;
