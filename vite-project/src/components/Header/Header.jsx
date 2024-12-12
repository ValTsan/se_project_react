//import React from "react";
import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import headerAvatar from "../../assets/Avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  //const location = info ? info.location : null;
  const userName = "Terence Tegegne";

  return (
    <header className="header">
      <img src={headerLogo} alt="Header Logo" className="header__logo" />
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        +Add clothes{" "}
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={headerAvatar}
          alt="Terrence Tegegne"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
