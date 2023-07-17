import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";

interface StarratingProps {
  gameId: number;
  initialRating?: number;
  color?: {
    filled: string;
    unfilled: string;
  };
  onRatingChange?: (gameId: number, rating: number) => void;
}

const Starrating: React.FC<StarratingProps> = ({
  gameId,
  initialRating = 0,
  color = {
    filled: "#f5eb3b",
    unfilled: "#808080",
  },
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const storedRating = getStoredRating(gameId);
    if (storedRating !== null) {
      setRating(storedRating);
    }
  }, [gameId]);

  const getStoredRating = (gameId: number) => {
    const storedRating = localStorage.getItem(`rating_${gameId}`);
    return storedRating !== null ? Number(storedRating) : null;
  };

  useEffect(() => {
    const storedRating = getStoredRating(gameId);
    if (storedRating !== null) {
      setRating(storedRating);
    } else {
      setRating(initialRating);
    }
  }, [gameId, initialRating]);

  useEffect(() => {
    localStorage.setItem(`rating_${gameId}`, String(rating));
    onRatingChange?.(gameId, rating);
  }, [rating, gameId, onRatingChange]);

  const getColor = (index: number) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const handleRatingClick = (selectedRating: number) => {
    if (selectedRating === rating) {
      selectedRating = 0;
    }

    setRating(selectedRating);
  };

  const starRating = useMemo(() => {
    return Array(4)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className="cursor-pointer"
          icon={rating >= idx ? fasStar : farStar}
          onClick={() => handleRatingClick(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [rating, hoverRating, color]);

  return <div className="flex">{starRating}</div>;
};

export default Starrating;