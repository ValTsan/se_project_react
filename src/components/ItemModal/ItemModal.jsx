import React, { useState } from "react";
import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, card, onClick }) {
  console.log("Card received in modal:", card);
  if (!activeModal || !card) {
    console.error("Modal is inactive or no card provided");
    return null; // Don't render if inactive or no card is passed
  }

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleConfirmDelete = () => {
    onClick();
    setIsConfirmationOpen(false);
    handleCloseClick();
  };

  // const handleCardDelete = (card) => {
  //   console.log("Opening modal for card:", card);
  //   setIsConfirmationOpen(true);
  // };

  // const handleCancelDelete = () => {
  //   setIsConfirmationOpen(false);
  // };

  return (
    <>
      {!isConfirmationOpen && (
        <div
          className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
        >
          <div className="modal__content modal__content_type_image">
            <button
              onClick={handleCloseClick}
              type="button"
              className="modal__close"
            ></button>
            <img src={card.imageUrl} alt="Clothes" className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <button
                onClick={() => setIsConfirmationOpen(true)}
                //onClick={handleCardDelete}
                type="button"
                className="modal__delete"
              >
                Delete item
              </button>
              <p className="modal__weather">Weather : {card.weather}</p>
            </div>
          </div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="modal modal_opened">
          <div className="modal__container modal__container_confirmation">
            <button
              onClick={() => setIsConfirmationOpen(false)}
              //onClick={handleCancelDelete}
              type="button"
              className="modal__close modal__close-confirmation"
              aria-label="Close button"
            ></button>
            <p className="modal__confirm-heading">
              Are you sure you want to delete this item? This action is
              irreversible.
            </p>
            <button
              type="text"
              onClick={handleConfirmDelete}
              className="modal__confirm-btn"
              aria-label="Delete button"
            >
              Yes, delete item
            </button>
            <button
              type="text"
              onClick={() => setIsConfirmationOpen(false)}
              //onClick={handleCancelDelete}
              className="modal__cancel-btn"
              aria-label="Cancel button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemModal;
