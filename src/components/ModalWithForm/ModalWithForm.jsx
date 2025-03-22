import "./ModalWithForm.css";
import useModalClose from "../Hooks/UseModalClose";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  customClass,
  isFormValid = true,
  additionalButtons,
}) {
  useModalClose(isOpen, handleCloseClick);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__content ${customClass || ""}`.trim()}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            <button
              type="submit"
              className="modal__submit"
              disabled={!isFormValid}
            >
              {buttonText}
            </button>
            {additionalButtons}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
