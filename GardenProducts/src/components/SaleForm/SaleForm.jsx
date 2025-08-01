import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./SaleForm.scss";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { applySaleForm } from "../../store/saleFormSlice";

const SaleForm = () => {
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

    const hasFirstOrderCompleted = localStorage.getItem("hasFirstOrderCompleted") === "true";
  if (hasFirstOrderCompleted) return null;

  const onSubmit = (data) => {
    dispatch(
      applySaleForm({
        email: data.email,
        name: data.name,
        phone: data.phone,
      })
    );

    setSubmitMessage("The discount has been successfully sent by email");
    reset();
    setIsSubmitted(true);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return isSubmitted ? null : (
    <section className="sale__form-section">
      <h3>5% off on the first order</h3>
      <div className="sale__form-container">
        <div className="sale__form-image__container">
          <img
          src="/Pictures/Discount/discount-image.png"           
          alt="image"
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

              {!hasErrors && submitMessage && (
                <p className="submit__message">{submitMessage}</p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            btnColor={submitMessage ? "submitted" : "white"}
            btnText={submitMessage ? "Request Submitted" : "Get a discount"}
            btnSize={"L"}
          />
        </form>
      </div>
    </section>  
  );
};

export default SaleForm;
