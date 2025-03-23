import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { UseFormAndValidation } from "../../Hooks/useFormAndValidation";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  onRegisterClick,
  isLoading,
}) => {
  const {
    values,
    handleChange,
    errors,
    resetForm,
    isValid,
    setIsValid,
    setValues,
    setErrors,
  } = UseFormAndValidation();

  const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submit triggered");

    if (!validateEmail(values.email) || values.password?.length < 8) {
      setIsValid(false);
      return;
    }

    try {
      await onLogin({ email: values.email, password: values.password });
    } catch (err) {
      setValues((prev) => ({
        ...prev,
        email: prev.email,
      }));
      setErrors((prev) => ({ ...prev, email: "Invalid email or password" }));
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Log in"
      buttonText={isLoading ? "Logging in..." : "Log in"}
      isOpen={isOpen}
      onSubmit={handleLoginSubmit}
      handleCloseClick={onClose}
      customClass="modal__content--login"
      isValid={isValid}
      additionalButtons={
        <button
          type="button"
          onClick={onRegisterClick}
          className="modal__register-btn"
          aria-label="Register button"
        >
          or Register
        </button>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          className={`modal__input ${
            errors.email ? "modal__input_type_error" : ""
          }`}
          id="email"
          name="email"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          minLength="8"
          className={`modal__input ${
            errors.password ? "modal__input_type_error" : ""
          }`}
          id="password"
          name="password"
          placeholder="Password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
