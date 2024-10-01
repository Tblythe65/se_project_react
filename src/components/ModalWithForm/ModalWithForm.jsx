import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  modalClass,
  switchButtonText,
  switchButtonClick,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className={modalClass}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__buttons">
            <button
              className="modal__submit modal__submit_disabled"
              type="submit"
            >
              {buttonText}
            </button>
            <button
              className="modal__submit modal__submit_switch"
              type="button"
              onClick={switchButtonClick}
            >
              {switchButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
