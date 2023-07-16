import React from 'react';
import Favorites from './Favorites';
import Starrating from './Starrating';

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  genre: string;
  rating: number;
  isFavorite: boolean;
}

interface GameItemListProps {
  sortedGames: Game[];
  onRatingChange: (gameId: number, rating: number) => void;
  onToggleFavorite: (gameId: number, isFavorite: boolean) => void;
}

const GameItemList: React.FC<GameItemListProps> = ({
  sortedGames,
  onRatingChange,
  onToggleFavorite,
}) => {
  const handleRatingChange = (gameId: number, rating: number) => {
    onRatingChange(gameId, rating);
  };

  if (!sortedGames || sortedGames.length === 0) {
    return <div>No games to display.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sortedGames.map((game) => (
        <div
          key={game.id}
          className="bg-white p-4 shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg"
        >
          <div className="flex flex-col h-full">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h3 className="flex justify-center text-lg font-semibold mb-2">{game.title}</h3>
            <p className="flex justify-center text-sm font-semibold text-blue-500">{game.genre}</p>
            <div className="flex justify-between">
              <Starrating
                initialRating={game.rating}
                gameId={game.id}
                onRatingChange={handleRatingChange}
              />
              <Favorites
                gameId={game.id}
                isFavorite={game.isFavorite}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameItemList;
