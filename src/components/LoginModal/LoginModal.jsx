import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onClose, onLogin, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={isOpen}
      onSubmit={handleLoginSubmit}
      handleCloseClick={onClose}
      customClass="modal__content--login"
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button
        type="button"
        onClick={onRegisterClick}
        className="modal__register-btn"
        aria-label="Register button"
      >
        or Register
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
