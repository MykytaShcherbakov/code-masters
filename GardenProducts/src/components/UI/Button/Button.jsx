import "./Button.scss";

// Универсальный компонент кнопки с кастомными стилями
const Button = ({ btnColor, btnSize, btnText, handleOnClick, type = "button", disabled = false }) => {
  return (
    <button
      className={`btn color-${btnColor} size-${btnSize}`}
      onClick={handleOnClick}
      type={type}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};

export default Button;
