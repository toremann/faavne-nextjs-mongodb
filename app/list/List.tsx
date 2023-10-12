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

interface ListProps {
  stocks: Stock[];
}

const List: React.FC<ListProps> = ({ stocks }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = stocks.filter((stock) => stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || stock.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <PageHeader title={'Alle utbytte aksjer'} subtitle={'Liste over alle utbytte aksjer'} />
        <div className="mb-4">
          <input type="text" placeholder="Søk..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        {filteredStocks.map((stock) => (
          <div key={stock.isin} className="flex hover:bg-slate-100 cursor-pointer pl-2 border-solid border-b-2 hover:border-orange-500 border-gray-300 relative group">
            <div className="text-sm md:text-base flex-1 truncate pr-4" onClick={() => router.push(`/stock/${stock.isin}`)}>
              <div className="font-bold -visible">{stock.symbol}</div>
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
