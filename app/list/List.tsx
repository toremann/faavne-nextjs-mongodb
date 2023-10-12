'use client';

// Prisma
import { Stock } from '@prisma/client';

// Components
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';

// Imports
import { useRouter } from 'next/navigation';
import { format, formatDistance } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { BsCircleFill } from 'react-icons/bs';
import scoreColorIcon from '../utils/scoreColorIcon';

interface ListProps {
  stocks: Stock[];
}

const List: React.FC<ListProps> = ({ stocks }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const filteredStocks = stocks.filter((stock) => stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || stock.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <PageHeader title={'Alle utbytte aksjer'} subtitle={'Liste over alle utbytte aksjer'} />
        <div className="mb-4 flex justify-end">
          {!showSearch ? (
            <div onClick={handleSearchClick} className="cursor-pointer">
              <RiSearchLine size={20} />
              {searchTerm && <div className="text-xs text-red-600">Filter aktivt!</div>}
            </div>
          ) : (
            <input
              type="text"
              placeholder="Søk i listen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={handleSearchClick}
              className="p-2 border border-gray-300 rounded-md w-3/4 sm:w-full"
            />
          )}
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        {filteredStocks.map((stock) => (
          <div key={stock.isin} onClick={() => router.push(`/stock/${stock.isin}`)} className="flex hover:bg-slate-100 cursor-pointer pl-2 border-solid border-b-2 hover:border-orange-500 border-gray-300 relative group">
            <div className="text-sm md:text-base flex-1 truncate pr-4">
              <div className="flex flex-row items-center gap-2">
                <div>
                  <BsCircleFill size={10} className={`${scoreColorIcon(stock.normalizeScore)}`} />
                </div>
                <div className="font-bold -visible">{stock.symbol}</div>
              </div>
              <div>{stock.name}</div>
            </div>
            <div className="text-right flex flex-col text-sm md:text-base">
              <div>{stock.dividendDate ? format(stock.dividendDate, 'dd/MM/yy') : 'Ingen dato'}</div>
              <div className="text-sm">{stock.dividendDate && formatDistance(stock.dividendDate, new Date(), { addSuffix: true, locale: nb })}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default List;
