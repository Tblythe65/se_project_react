import "./Avatar.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Avatar() {
  const currentUser = useContext(CurrentUserContext);

  return currentUser?.avatar ? (
    <img
      src={currentUser?.avatar}
      alt={currentUser?.name}
      className="avatar__image"
    />
  ) : (
    <div className="avatar__image">{name.charAt(0)}</div>
  );
}

export default Avatar;
