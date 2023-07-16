import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

interface Genre {
  name: string;
  active: boolean;
}

interface GenreListProps {
  genres: Genre[];
  selectedGenre: string;
  filterByGenre: (genreName: string) => void;
  onFilterFavorites: () => void;
  setGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
}

const GenreList: React.FC<GenreListProps> = ({
  genres,
  selectedGenre,
  filterByGenre,
  onFilterFavorites,
  setGenres,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGenreClick = (genreName: string) => {
    filterByGenre(genreName);
    setGenres((prevGenres) => {
      return prevGenres.map((genre) => {
        if (genre.name === genreName) {
          return { ...genre, active: true };
        } else {
          return { ...genre, active: false };
        }
      });
    });
    setIsMenuOpen(false);
  };

  const handleFilterFavorites = () => {
    onFilterFavorites();
    setIsMenuOpen(false);
  };

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
  };

  return (
    <div className="w-28 h-full bg-blue-150 border rounded border-gray-300 text-white">
      <h2 className="text-lg font-bold mb-1 px-1 flex justify-center">Genres</h2>
      <div className="cursor-pointer py-2 px-4 hover:text-blue-200" onClick={handleMenuToggle}>
        &#9776; Menu
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="menu-content"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.2 }}
          >
            <ul className="text-white">
              <li
                className={`cursor-pointer py-2 px-4 ${selectedGenre === 'All' ? 'text-blue-200' : ''}`}
                onClick={() => handleGenreClick('All')}
              >
                All
              </li>
              <li
                className={`cursor-pointer py-2 px-4 ${
                  selectedGenre === 'Favoritados' ? 'text-blue-200' : ''
                }`}
                onClick={handleFilterFavorites}
              >
                Favoritados
              </li>
              {genres.map((genre) => (
                <li
                  key={genre.name}
                  className={`cursor-pointer py-2 px-4 ${genre.active ? 'text-blue-200' : ''}`}
                  onClick={() => handleGenreClick(genre.name)}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenreList;
