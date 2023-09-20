'use client';

import scoreColor from '@/app/utils/scoreColor';

import { SafeUser } from '@/app/types';
import { Stock } from '@prisma/client';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';

interface StocksCardProps {
  stock: Stock;
  currentUser?: SafeUser | null;
  scoreColor: (score: number) => string;
}

const ListingCard: React.FC<StocksCardProps> = ({ stock, currentUser, scoreColor }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/stock/${stock.isin}`)} className="col-span-1 cursor-pointer group hover:shadow-md transition rounded-lg">
      <div className="bg-white shadow-lg overflow-hidden rounded-lg">
        <div className="px-4 py-6">
          <div>
            <div className="text-gray-600 md:text-sm">{stock.nameLong}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-lg font-semibold text-gray-800">{stock.symbol}</div>
            <div className="text-lg text-blue-800">{stock.price.toFixed(2)} NOK</div>
          </div>
          <div className="flex justify-end">
            {stock.pct !== null && (
              <div className={`text-sm text-right ${stock.pct > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.pct > 0 ? '+' : ''}
                {stock.pct}%
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div>{stock.dividend !== null && <div className="text-sm">Utbytte:</div>}</div>
            <div>{stock.dividend !== null && <div className="text-2xl font-bold">{stock.dividend} NOK</div>}</div>
          </div>
          <div className="mt-4 flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              {stock.dividendDate !== null && <div className="text-sm">Utbytte</div>}
              {stock.excludingDate !== null && <div className="text-sm">Ex</div>}
            </div>
            <div className="flex justify-between items-center">
              {stock.dividendDate !== null && <div className="text-m">{format(stock.dividendDate, 'dd/MM')}</div>}
              {stock.excludingDate !== null && <div className="text-m">{format(stock.excludingDate, 'dd/MM')}</div>}
            </div>
          </div>
        </div>
        <div className={` ${scoreColor(stock.normalizeScore)} flex justify-between pl-2 pr-2`}>
          <div className="text-white">Score</div>
          <div className="text-white font-extrabold text-center">{stock.normalizeScore}</div>
        </div>
      </div>
    </div>
  );
};
export default ListingCard;
