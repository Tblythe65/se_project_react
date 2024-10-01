import React, { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatarUrl });
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name);
      setAvatarUrl(currentUser?.avatar);
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      modalClass="modal__content modal__content_type_form_small"
    >
      <label htmlFor="name" className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar *{" "}
        <input
          type="url"
          className="modal__input"
          id="avatarurl"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
