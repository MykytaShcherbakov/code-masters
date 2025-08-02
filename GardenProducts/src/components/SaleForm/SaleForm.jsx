import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {
  applySaleForm,
  setFirstOrderCompleted,
} from "../../store/saleFormSlice";
import "./SaleForm.scss";

const SaleForm = () => {
  const dispatch = useDispatch();
  const [submitMessage, setSubmitMessage] = useState(""); // Сообщение об успешной отправке
  const [isSubmitted, setIsSubmitted] = useState(false); // Была ли форма отправлена

  // Инициализация React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Проверка, была ли форма уже отправлена ранее
  useEffect(() => {
    const submitted = localStorage.getItem("isSaleFormSubmitted") === "true";
    const message = localStorage.getItem("saleFormMessage");

    if (submitted && message) {
      setIsSubmitted(true);
      setSubmitMessage(message); // Отображаем сообщение об успешной отправке
    }
  }, []);

   // Функция обработки отправки формы
  const onSubmit = (data) => {
    dispatch(applySaleForm(data)); // Сохраняем данные в Redux и localStorage

    const message = "The discount has been successfully sent by email";
    setSubmitMessage(message);
    setIsSubmitted(true);
    reset();

    // Сохраняем данные в localStorage, чтобы они не терялись после обновления
    localStorage.setItem("isSaleFormSubmitted", "true");
    localStorage.setItem("saleFormMessage", message);
  };

  return (
    <section className="sale__form-section">
      <h3>5% off on the first order</h3>
      <div className="sale__form-container">
        <div className="sale__form-image__container">
          <img
            src="/Pictures/Discount/discount-image.png"
            alt="Discount"
            className="sale__form-image"
          />
        </div>
        <form className="sale__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="sale__form-inputs">
            <div className="input__container">
              <Input
                typeName="text"
                placeholderName="Name"
                formClass="sale__form-control"
                registerData={register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>
            <div className="input__container">
              <Input
                typeName="text"
                placeholderName="Phone number"
                formClass="sale__form-control"
                registerData={register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Wrong input. Try again",
                  },
                })}
              />
              {errors.phone && (
                <p className="error-message">{errors.phone.message}</p>
              )}
            </div>
            <div className="input__container">
              <Input
                typeName="email"
                placeholderName="Email"
                formClass="sale__form-control"
                registerData={register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Wrong input. Try again",
                  },
                })}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
              {submitMessage && (
                <p className="submit__message">{submitMessage}</p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            btnColor={submitMessage ? "submitted" : "white"}
            btnText={submitMessage ? "Request Submitted" : "Get a discount"}
            btnSize="L"
            disabled={isSubmitted}
          />
        </form>
      </div>
    </section>
  );
};

export default SaleForm;