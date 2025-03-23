import React from "react";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { UseForm } from "../../Hooks/useForm";

const AddItemModal = ({ handleCloseClick, onAddItem, isOpen, isLoading }) => {
  const { values, handleChange, setValues } = UseForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={isLoading ? "Saving..." : "Add Garment"}
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleAddItemSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
        {/* <button type="submit" className="modal__submit" disabled={!isFormValid}>
          Submit
        </button> */}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
