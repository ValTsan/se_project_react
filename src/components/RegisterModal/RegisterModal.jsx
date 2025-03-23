import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  handleCloseClick,
  onRegister,
  isOpen,
  onLoginClick,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const validateEmail = (email) => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  };

  const validateUrl = (url) => {
    return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(url);
  };

  const handleEmailChange = (evt) => {
    validateEmail(evt.target.value);
    setEmail(evt.target.value);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(evt.target.value) ? "" : "Invalid email format",
    }));
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
    setErrors((prev) => ({
      ...prev,
      password:
        evt.target.value.length >= 8
          ? ""
          : "Password must be at least 8 characters",
    }));
  };

  const handleNameChange = (evt) => {
    console.log(evt.target.value);
    setName(evt.target.value);
    setErrors((prev) => ({
      ...prev,
      name: evt.target.value.trim() ? "" : "Name is required",
    }));
  };

  const handleAvatarChange = (evt) => {
    console.log(evt.target.value);
    setAvatar(evt.target.value);
    setErrors((prev) => ({
      ...prev,
      avatar:
        evt.target.value === "" || validateUrl(evt.target.value)
          ? ""
          : "Invalid URL (must be a direct image link)",
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Submitting form with:", { name, avatar, email, password });

    onRegister({ name, avatar, email, password }, () => {
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
    });
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
    }
  }, [isOpen]);

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" &&
        validateEmail(email) &&
        password.length >= 8 &&
        (avatar === "" || validateUrl(avatar))
    );
  }, [name, email, password, avatar]);

  return (
    <ModalWithForm
      title="Register"
      buttonText={isLoading ? "Registering..." : "Next"}
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleRegisterSubmit}
      customClass="modal__content--register"
      isFormValid={isFormValid}
      additionalButtons={
        <button
          type="button"
          onClick={onLoginClick}
          className="modal__login-btn"
          aria-label="Login button"
        >
          or Log in
        </button>
      }
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className={`modal__input ${
            errors.email ? "modal__input_type_error" : ""
          }`}
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className={`modal__input ${
            errors.password ? "modal__input_type_error" : ""
          }`}
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className={`modal__input ${
            errors.avatar ? "modal__input_type_error" : ""
          }`}
          id="avatarUrl"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
