import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

interface FavoritesProps {
  gameId: number;
  isFavorite: boolean;
  onToggleFavorite: (gameId: number, isFavorite: boolean) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ gameId, isFavorite, onToggleFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite_${gameId}`);
    if (storedFavorite !== null) {
      setFavorite(JSON.parse(storedFavorite));
    }
  }, [gameId]);

  const handleFavoriteClick = () => {
    const newFavorite = !favorite;
    setFavorite(newFavorite);
    onToggleFavorite(gameId, newFavorite);
    localStorage.setItem(`favorite_${gameId}`, JSON.stringify(newFavorite));
  };

  return (
    <div>
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={favorite ? fasHeartSolid : farHeart}
        onClick={handleFavoriteClick}
        style={{ color: favorite ? "red" : "gray" }}
      />
    </div>
  );
};

export default Favorites;
