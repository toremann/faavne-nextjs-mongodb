'use client';

import { useState, ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
// Remember to import words or whatever you're using to store all the words the user can search for

interface SearchbarProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void

}

const Searchbar: React.FC<SearchbarProps> = () => {
  const words = ['MPCC', 'CAMBI'];

  const [activeSearch, setActiveSearch] = useState([]);

  console.log(activeSearch);

  const handleSearch = (e) => {
    if (e.target.value == '') {
      setActiveSearch([]);
      return false;
    }
    setActiveSearch(words.filter((w) => w.includes(e.target.value)).slice(0, 8));
  };

  return (
<form className="relative">
  <div className="relative border-b border-gray-300 focus-within:border-black transition-all duration-300">
  <button className="absolute left-1 top-1/2 -translate-y-1/2">
      <AiOutlineSearch />
    </button>
    <input
      type="search"
      placeholder="Søk.."
      className="w-full pl-6 focus:outline-none focus:appearance-none"
      onChange={(e) => handleSearch(e)}
    />
  </div>

  {activeSearch.length > 0 && (
    <div className="absolute shadow-md w-full md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
      <div>
        {activeSearch.map((result) => (
          <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
            {result}
          </div>
        ))}
      </div>
    </div>
  )}
</form>

  );
};

export default Searchbar;
