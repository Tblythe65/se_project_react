import React, { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
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

  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
