import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleAddClick, onCardClick, clothingItems }) {
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
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
