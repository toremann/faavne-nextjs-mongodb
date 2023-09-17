'use client';

import { SafeUser } from '@/app/types';
import { Stock } from '@prisma/client';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';

interface ListingCardProps {
  stock: Stock;
  currentUser?: SafeUser | null;
  scoreColor: (score: number) => string;
}

const scoreColor = (score: number) => {
  const colorClasses: Record<string, string> = {
    1: 'bg-red-100',
    25: 'bg-yellow-200',
    50: 'bg-blue-300',
    75: 'bg-green-400',
    100: 'bg-purple-500',
  };

  let bgColorClass = 'bg-gray-200';

  for (const pointRange in colorClasses) {
    if (score <= parseInt(pointRange)) {
      bgColorClass = colorClasses[pointRange];
      break;
    }
  }

  return bgColorClass;
};

const ListingCard: React.FC<ListingCardProps> = ({ stock, currentUser }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/stock/${stock.isin}`)} className="col-span-1 cursor-pointer group">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-6">
          <div className="flex justify-between">
            <div>
              <div className="text-2xl font-semibold text-gray-800">{stock.symbol}</div>
            </div>
            <div className="flex flex-col ml-4">
              {stock.pct !== null && (
                <div className={`text-sm ${stock.pct > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.pct > 0 ? '+' : ''}
                  {stock.pct}%
                </div>
              )}
              <div className="text-sm text-blue-800">{stock.price} NOK</div>
            </div>
          </div>

          <div></div>
          <div className="text-gray-600 md:text-sm">{stock.nameLong}</div>
          <div className="mt-4 flex flex-col items-center">
            <div>{stock.dividend !== null && <div className="text-sm">Utbytte:</div>}</div>
            <div>{stock.dividend !== null && <div className="text-2xl font-bold">{stock.dividend} NOK</div>}</div>
          </div>
          <div>
            {stock.dividendDate !== null && <div className="text-sm">Utbytte dato: {format(stock.dividendDate, 'PP')}</div>}
            {stock.excludingDate !== null && <div className="text-sm">Excluding dato: {format(stock.excludingDate, 'PP')}</div>}
          </div>
        </div>
        <div className={`text-white ${scoreColor(stock.normalizeScore)} font-extrabold text-center rounded-bottom`}>{stock.normalizeScore}</div>
      </div>
    </div>
  );
};
export default ListingCard;
