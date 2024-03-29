'use client';

// Types
import { SafeUser } from '@/app/types';

// Prisma
import { Stock } from '@prisma/client';

// Imports
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

// Utils
import { formatCurrency } from '@/app/utils/formatCurrency';

interface StocksCardProps {
  stock: Stock;
  currentUser?: SafeUser | null;
  scoreColor: (score: number) => string;
}

const StockCards: React.FC<StocksCardProps> = ({ stock, scoreColor }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/stock/${stock.isin}`)} className="col-span-1 cursor-pointer group  rounded-lg">
      <div className="bg-white dark:bg-gray-800/75 dark:hover:bg-gray-800 shadow-lg overflow-hidden rounded-lg hover:shadow-xl  transition">
        <div className="px-4 py-6">
          <div>
            <div className="text-gray-600 md:text-sm truncate">{stock.nameLong}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-lg font-semibold text-gray-800 dark:text-white">{stock.symbol}</div>
            <div className="text-lg text-blue-800">{formatCurrency(stock.price)} NOK</div>
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
            <div>{stock.dividend !== null && <div className="text-sm dark:text-gray-600">Utbytte:</div>}</div>
            <div>{stock.dividend !== null && <div className="text-2xl font-bold dark:text-white">{formatCurrency(stock.dividend)} NOK</div>}</div>
          </div>
          <div className="mt-4 flex flex-col space-y-1">
            <div className="flex justify-between items-center">
              <div className="text-sm dark:text-gray-600">Utbytte</div>
              <div className="text-sm dark:text-gray-600">Ex</div>
            </div>
            <div className="flex justify-between items-center dark:text-white">
              {stock.dividendDate !== null ? <div className="text-m">{format(stock.dividendDate, 'dd/MM')}</div> : <div className="text-m"> N/A </div>}
              {stock.excludingDate !== null ? <div className="text-m">{format(stock.excludingDate, 'dd/MM')}</div> : <div className="text-m"> N/A </div>}
            </div>
          </div>
        </div>
        <div className={`${scoreColor(stock.normalizeScore)} flex justify-between pl-2 pr-2 dark:text-white`}>
          <div className="text-white">Score</div>
          <div className="text-white font-extrabold text-center">{stock.normalizeScore}</div>
        </div>
      </div>
    </div>
  );
};
export default StockCards;
