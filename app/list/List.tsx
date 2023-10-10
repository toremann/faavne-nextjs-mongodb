'use client';

import { Stock } from '@prisma/client';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';

import { useRouter } from 'next/navigation';

import { format, formatDistance, isBefore } from 'date-fns';
import { nb } from 'date-fns/locale';

interface ListProps {
  stocks: Stock[];
}

const List: React.FC<ListProps> = ({ stocks }) => {
  const router = useRouter();

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-3 mb-2">
          <PageHeader title={'Alle utbytte aksjer'} subtitle={'Liste over alle utbytte aksjer'} />
        </div>
        {stocks.map((stock: Stock) => (
          <div key={stock.isin} className="flex hover:text-sky-700 hover:bg-slate-100 cursor-pointer pl-2 border-solid border-b-2 border-gray-300">
            <div className="text-sm md:text-base flex-1 truncate" onClick={() => router.push(`/stock/${stock.isin}`)}>
              <div className="font-bold -visible">{stock.symbol}</div>
              <div >{stock.name}</div>
            </div>
            <div className="text-right flex flex-col text-sm md:text-base">
              <div>{stock.dividendDate ? format(stock.dividendDate, 'dd/MM/yy') : 'Ingen dato'}</div>
              <div>{stock.dividendDate && formatDistance(stock.dividendDate, new Date(), { addSuffix: true, locale: nb })}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default List;
