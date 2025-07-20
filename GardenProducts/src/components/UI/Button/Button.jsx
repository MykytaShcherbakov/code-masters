import "./Button.scss";

const Button = ({ btnColor, btnSize, btnText, handleOnClick }) => {
  return (
    <>
      <button className={`btn color-${btnColor} size-${btnSize}`} onClick={handleOnClick}>
        {btnText}
      </button>
    </>
  );
};

export default Button;