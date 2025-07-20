import "./Input.scss";

const Input = ({ typeName, placeholderName, formClass, registerData, pageTheme }) => {
  // Получаем переданный type, placeholder, classname и register для React-Hook-Form
  return (
    <>
      <input
        type={typeName}
        placeholder={placeholderName}
        className={`input ${formClass} input-${pageTheme}`} // Первый класс общиий стиль, потом 2 варинта класса для 2х форм и для темной темы
        {...registerData} // Данные нашего регистра
      />
    </>
  );
};

export default Input;