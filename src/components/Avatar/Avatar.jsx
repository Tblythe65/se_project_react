import "./Avatar.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Avatar() {
  const { name, avatar } = useContext(CurrentUserContext);

  return avatar ? (
    <img src={avatar} alt={name} className="avatar__image" />
  ) : (
    <div className="avatar__image">{name.charAt(0)}</div>
  );
}

export default Avatar;
