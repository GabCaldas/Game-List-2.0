import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onToggleOrder: () => void;
  sortOrder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onToggleOrder, sortOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm.trim()); // Trim the search term before passing it
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-8">
        <input
          type="text"
          className="rounded-l-full w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none"
          placeholder="Pesquisar por título ou gênero"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="p-2">
          <button
            type="submit"
            className="bg-white text-blue-150 font-bold py-2 px-4 rounded-r-full focus:outline-none"
          >
            Pesquisar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
