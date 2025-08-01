import "./Input.scss";

const Input = ({ typeName, placeholderName, formClass, registerData }) => {
  return (
    <input
      type={typeName}
      placeholder={placeholderName}
      className={`input ${formClass}`}
      {...registerData}
    />
  );
};

export default Input;
