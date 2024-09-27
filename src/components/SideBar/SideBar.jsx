import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleLogOutClick, handleEditProfileClick }) {
  const { name, avatar } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="avatar" />
      <p className="sidebar__username">{name}</p>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__edit-profile"
        >
          Change profile data
        </button>
        <button
          onClick={handleLogOutClick}
          type="button"
          className="sidebar__logout"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
