import React from "react";
import headerAvatar from "../../assets/Avatar.png";
import "./SideBar.css";

function SideBar({ currentUser }) {
  console.log("SideBar component currentUser:", currentUser);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || headerAvatar}
        alt={currentUser?.name || "User Avatar"}
      />
      <p className="sidebar__username">{currentUser?.name}</p>
    </div>
  );
}

export default SideBar;
