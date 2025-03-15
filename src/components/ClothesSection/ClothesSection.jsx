import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ handleAddClick, onCardClick, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button
          type="button"
          className="clothes-section__add-clothes-btn"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      {userClothingItems.length > 0 ? (
        <ul className="clothes-section__items">
          {userClothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      ) : (
        <p className="clothes-section__empty">You don't have any items yet</p>
      )}
    </div>
  );
}

export default ClothesSection;
