'use client';

import { Stock } from '@prisma/client';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';


interface ListProps {
  stocks: Stock[];
}

const List: React.FC<ListProps> = ({ stocks }) => {
  const router = useRouter();

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-3">
          <PageHeader title={'Alle utbytte aksjer'} subtitle={'Alle utbytte aksjer'} />
        </div>
        {stocks.map((stock: Stock) => (
          <div key={stock.isin} className="flex hover:text-sky-700 hover:bg-slate-100 cursor-pointer m-2 p-2 border-solid border-b-2 border-gray-300">
            <div className="flex-1 w-64 truncate" onClick={() => router.push(`/stock/${stock.isin}`)}>
              <div className="font-bold">{stock.symbol}</div>
              <div>{stock.name}</div>
            </div>
            <div className="text-justify flex-auto">{stock.dividendDate && format(stock.dividendDate, 'dd/MM/yy')}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default List;
