import React, { useState, useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, handleCloseClick, card, onClick }) {
  const currentUser = useContext(CurrentUserContext);
  if (!card) return null;

  console.log("Card received in modal:", card);
  if (!activeModal || !card) {
    console.error("Modal is inactive or no card provided");
    return null;
  }

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const isOwn = card.owner === currentUser?._id;

  const handleDeleteConfirm = () => {
    onClick();
    handleCloseClick();
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

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
              {isOwn && (
                <button
                  onClick={() => setIsConfirmationOpen(true)}
                  type="button"
                  className="modal__delete"
                >
                  Delete item
                </button>
              )}
              <p className="modal__weather">Weather : {card.weather}</p>
            </div>
          </div>
        </div>
      )}

      {isConfirmationOpen && (
        <div className="modal modal_opened">
          <div className="modal__container modal__container_confirmation">
            <button
              onClick={handleCancel}
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
              onClick={handleDeleteConfirm}
              className="modal__confirm-btn"
              aria-label="Delete button"
            >
              Yes, delete item
            </button>
            <button
              type="text"
              onClick={handleCancel}
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
