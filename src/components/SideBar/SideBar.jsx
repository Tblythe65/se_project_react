import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleLogOutClick, handleEditProfileClick }) {
  const { name, avatar } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <p className="sidebar__username">{name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfileClick}
          type="button"
          className="sidebar__button"
        >
          Change profile data
        </button>
        <button
          onClick={handleLogOutClick}
          type="button"
          className="sidebar__button"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
