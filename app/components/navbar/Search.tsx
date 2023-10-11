'use client';

// Prisma
import { Stock } from '@prisma/client';

// Imports
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchbarProps {
  stocks: Stock[];
}

const Searchbar: React.FC<SearchbarProps> = ({ stocks }) => {
  const router = useRouter();

  const [activeSearch, setActiveSearch] = useState<Stock[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!inputValue) {
      setActiveSearch([]);
      return;
    }

    const filteredStocks = stocks.filter((stock) => stock.symbol.includes(inputValue) || stock.name.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 9);

    setActiveSearch(filteredStocks);
  };

  const handleRouter = (route: Stock['isin']) => {
    setActiveSearch([]);
    router.push(`/stock/${route}`);
  };

  return (
    <div className="relative">
      <div className="relative border-b border-gray-300 focus-within:border-black transition-all duration-300">
        <button type="button" className="absolute left-1 top-1/2 -translate-y-1/2">
          <AiOutlineSearch />
        </button>
        <input type="search" placeholder="Søk.." className="w-full pl-6 focus:outline-none focus:appearance-none" onChange={(e) => handleSearch(e)} />
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute shadow-md w-full md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div>
            {activeSearch.map((stock: any) => (
              <div onClick={() => handleRouter(stock.isin)} key={stock.isin} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer">
                {stock.symbol} <div className="font-light text-xs">{stock.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
