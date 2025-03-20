import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import headerAvatar from "../../assets/Avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  onLoginClick,
  isLoggedIn,
  onRegisterClick,
}) {
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
          {currentDate}
          {weatherData && weatherData.city ? `, ${weatherData.city}` : ""}
          {weatherData && weatherData.temp ? ` ${weatherData.temp.F}°F` : ""}
        </p>
        <ToggleSwitch />
      </div>
      <div className="header__user-container">
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes{" "}
            </button>
            <Link to="/profile" className="header__link">
              <p className="header__username">{userName}</p>
              <img
                src={headerAvatar}
                alt="Terrence Tegegne"
                className="header__avatar"
              />
            </Link>
          </>
        ) : (
          <>
            <button onClick={onRegisterClick} className="header__register-btn">
              Sign up
            </button>
            <button onClick={onLoginClick} className="header__login-btn">
              Log in
            </button>
          </>
        )}
      </div>
      <div className="header__bar"></div>
    </header>
  );
}

export default Header;
