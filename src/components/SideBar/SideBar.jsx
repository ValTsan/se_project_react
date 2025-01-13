import React from "react";
import headerAvatar from "../../assets/Avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={headerAvatar}
        alt="Default avatar"
      />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
