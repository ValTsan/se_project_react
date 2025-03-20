import React from "react";
import { useState } from "react";
import "../Profile/Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Profile({
  handleAddClick,
  onCardClick,
  clothingItems,
  handleAddNewClick,
  onLogout,
  onUpdateUser,
  onEditProfileClick,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleAddNewClick={handleAddNewClick}
          onCardClick={onCardClick}
        />
        <button className="profile__edit-btn" onClick={onEditProfileClick}>
          Change profile data
        </button>
        <button onClick={onLogout} className="profile__logout-btn">
          Log out
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
