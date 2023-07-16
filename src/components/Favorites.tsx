import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
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
      <motion.div
        className="cursor-pointer"
        onClick={handleFavoriteClick}
        style={{ color: favorite ? "red" : "gray" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={favorite ? fasHeartSolid : farHeart} />
      </motion.div>
    </div>
  );
};

export default Favorites;
