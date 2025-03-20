import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likedButton from "../../assets/liked-button.svg";
import likeDefault from "../../assets/like-default.svg";

function ItemCard({ item, onCardClick, handleCardLike, handleCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    handleCardLike({ id: item._id, isLiked });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    handleCardDelete(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {currentUser && (
        <button onClick={handleLikeClick} className="card__like-btn">
          <img src={isLiked ? likedButton : likeDefault} alt="Like button" />
        </button>
      )}

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
