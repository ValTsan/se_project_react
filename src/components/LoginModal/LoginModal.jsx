import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const validateForm = (email, password) => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).every((key) => newErrors[key] === ""));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateForm(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateForm(email, e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    console.log("Login submit triggered");
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    setIsLoading(true);
    try {
      await onLogin({ email, password });
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email or password",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrors({ email: "", password: "" });
      setIsValid(false);
    }
  }, [isOpen]);

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
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          className={`modal__input ${
            errors.password ? "modal__input_type_error" : ""
          }`}
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
