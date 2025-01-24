import "./ItemModal.css";

function ItemModal({ activeModal, handleCloseClick, card, handleCardDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
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
            onClick={handleCardDelete}
            type="button"
            className="modal__delete"
          >
            Delete item
          </button>
          <p className="modal__weather">Weather : {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
