import loadgif from '@/app/assets/loading.gif';
import GameItemList from '@/components/GameItemList';
import GenreList from '@/components/GenreList';
import Header from '@/components/Header';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import SearchBar from '@/components/SearchBar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDF6me6wK5ed-uUFk73ABAI0UZ9fteiHXI",
  authDomain: "react-gamelist.firebaseapp.com",
  projectId: "react-gamelist",
  storageBucket: "react-gamelist.appspot.com",
  messagingSenderId: "810660847157",
  appId: "1:810660847157:web:20cab83508205aefbd5b7c"
};


const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  genre: string;
  rating: number;
  isFavorite: boolean;
}

interface Genre {
  name: string;
  active: boolean;
}

const GameList: React.FC = () => {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');
  const [displayCount, setDisplayCount] = useState(30); // Quantidade inicial de jogos exibidos
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Ordem de classificação dos jogos
  const [selectedGenre, setSelectedGenre] = useState<string>('All'); // Gênero selecionado para filtragem
  const [showNoFavoritesMessage, setShowNoFavoritesMessage] = useState(false); // Mostrar mensagem de nenhum favorito

  const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';
  const headers = {
    Accept: 'application/json, text/plain, */*',
    'dev-email-address': 'gabrielcaldas7@gmail.com',
  };

  useEffect(() => {
    const apiTimeout = setTimeout(() => {
      setError('O servidor demorou para responder. Tente mais tarde.');
      setLoading(false);
    }, 5000);

    axios
      .get<Game[]>(url, { headers, timeout: 5000 })
      .then((response) => {
        clearTimeout(apiTimeout);
        const data = response.data;
        setGameList(data);
        setLoading(false);
        extractGenres(data);
      })
      .catch((error) => {
        clearTimeout(apiTimeout);
        if (error.response && error.response.status >= 500 && error.response.status <= 509) {
          setError('O servidor falhou em responder. Tente recarregar a página.');
        } else {
          setError('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde.');
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const storedGameList = localStorage.getItem('gameList');
    if (storedGameList) {
      const parsedGameList = JSON.parse(storedGameList);
      setGameList(parsedGameList);
    }

    const storedGenres = localStorage.getItem('genres');
    if (storedGenres) {
      setGenres(JSON.parse(storedGenres));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gameList', JSON.stringify(gameList));
  }, [gameList]);

  useEffect(() => {
    localStorage.setItem('genres', JSON.stringify(genres));
  }, [genres]);

  const extractGenres = (games: Game[]) => {
    const genreSet = new Set<string>();
    games.forEach((game) => {
      genreSet.add(game.genre);
    });
    const genreArray = [
      { name: 'All', active: true },
      { name: 'Favoritados', active: false },
      ...Array.from(genreSet).map((genre) => ({ name: genre, active: false })),
    ];
    setGenres(genreArray);
  };

  const filterByGenre = (genreName: string) => {
    setSelectedGenre(genreName);
  };

  const filterFavorites = () => {
    setSelectedGenre('Favoritados');
  };

  const addFavoriteGame = (gameId: number) => {
    const gameRef = firestore.collection('favorites').doc(gameId.toString());
    gameRef
      .set({ gameId })
      .then(() => {
        console.log('Jogo favorito adicionado com sucesso ao Firestore');
      })
      .catch((error) => {
        console.error('Erro ao adicionar jogo favorito ao Firestore:', error);
      });
  };

  const removeFavoriteGame = (gameId: number) => {
    const gameRef = firestore.collection('favorites').doc(gameId.toString());
    gameRef
      .delete()
      .then(() => {
        console.log('Jogo favorito removido com sucesso do Firestore');
      })
      .catch((error) => {
        console.error('Erro ao remover jogo favorito do Firestore:', error);
      });
  };

  const checkFavoriteGame = async (gameId: number) => {
    const gameRef = firestore.collection('favorites').doc(gameId.toString());
    const snapshot = await gameRef.get();
    return snapshot.exists;
  };

  const handleRatingChange = (gameId: number, rating: number) => {
    const updatedGameList = gameList.map((game) => {
      if (game.id === gameId) {
        return { ...game, rating };
      }
      return game;
    });
    setGameList(updatedGameList);
  };

  const handleToggleFavorite = async (gameId: number, isFavorite: boolean) => {
    const updatedGameList = gameList.map((game) => {
      if (game.id === gameId) {
        return { ...game, isFavorite };
      }
      return game;
    });
    setGameList(updatedGameList);

    if (isFavorite) {
      await addFavoriteGame(gameId);
    } else {
      await removeFavoriteGame(gameId);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const sortGamesByRating = (games: Game[], order: 'asc' | 'desc') => {
    const sortedGames = [...games];
    sortedGames.sort((a, b) => {
      if (a.rating === 0 && b.rating === 0) {
        return 0;
      } else if (a.rating === 0) {
        return 1; 
      } else if (b.rating === 0) {
        return -1;
      } else {
  
        if (order === 'asc') {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      }
    });
    return sortedGames;
  };
  
  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  const ErrorPopup: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-white rounded-lg shadow-lg text-center z-50 w-96">
        <p className="text-blue-150 text-xl py-6">{message}</p>
        <button
          className="bg-blue-150 text-white px-4 py-4 rounded-md hover:bg-blue-200"
          onClick={handleReloadPage}
        >
          Recarregar Página
        </button>
      </div>
    );
  };

  const handleCloseErrorPopup = () => {
    setError('');
  };


  const filteredGames = gameList.filter((game) => {
    if (selectedGenre === 'All') {
      return true;
    } else if (selectedGenre === 'Favoritados') {
      return game.isFavorite;
    } else {
      return game.genre === selectedGenre;
    }
  });


  const sortedGames = sortGamesByRating(filteredGames, sortOrder);

  
  const hasFavorites = filteredGames.some((game) => game.isFavorite);

  return (
    <div className="flex flex-col items-center justify-center bg-blue-150 min-h-screen">
      {error && <ErrorPopup message={error} onClose={handleCloseErrorPopup} />}
      <Header />
      {!error && (
        <div className="w-full md:w-3/4 flex flex-col items-center">
          {!loading && (
            <>
              <SearchBar onSearch={handleSearch} />
              <div className="flex w-full justify-end mb-4">
              <div className="flex items-center">
                <span className="text-white mr-2">Sort by:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => handleSortOrderChange(e.target.value)}
                  className="border border-blue-500 bg-white text-gray-900 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:border-blue-700"
                >
                  <option value="desc">Highest Rating</option>
                  <option value="asc">Lowest Rating</option>
                </select>
              </div>
            </div>
              <div className="flex">
                <GenreList
                  genres={genres}
                  selectedGenre={selectedGenre}
                  filterByGenre={filterByGenre}
                  filterFavorites={filterFavorites}
                  loading={loading}
                />
                <div className="flex flex-col items-center w-full">
                  {loading && (
                    <div className="flex items-center justify-center my-10">
                      <Image className="w-14" src={loadgif} alt="Loading" />
                    </div>
                  )}
                  {!loading && (
                    <>
                      {selectedGenre === 'Favoritados' && !hasFavorites && (
                        <div className="text-white text-xl mt-10">
                          
Favorite games so they appear here!
                        </div>
                      )}
                      {selectedGenre !== 'Favoritados' && (
                       <GameItemList
                       sortedGames={sortedGames} // Alterado de gameList para sortedGames
                       onRatingChange={handleRatingChange}
                       onToggleFavorite={handleToggleFavorite}
                     />
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GameList;