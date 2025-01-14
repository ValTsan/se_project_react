import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import headerAvatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userName = "Terence Tegegne";

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={headerLogo} alt="Header Logo" className="header__logo" />
        </Link>

        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes{" "}
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={headerAvatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
            <div className="header__bar"></div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
