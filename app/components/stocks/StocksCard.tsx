'use client';

import { SafeUser } from '@/app/types';
import { Stock } from '@prisma/client';

import { useRouter } from 'next/navigation';

interface ListingCardProps {
  stock: Stock;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ stock, currentUser }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/stock/${stock.symbol}`)} className="col-span-1 cursor-pointer group">
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="px-4 py-6">
      <h3 className="text-2xl font-semibold text-gray-800">{stock.symbol}</h3>
      <p className="text-gray-600">{stock.nameLong}</p>
      <div className="mt-4">
        <p className="text-xl text-blue-600">${stock.price}</p>
        {stock.pct !== null && (
          <p className={`text-sm mt-2 ${stock.pct > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock.pct > 0 ? '+' : ''}{stock.pct}%
          </p>
        )}
      </div>
      <div className="mt-4">
        {stock.dividend !== null && (
          <p className="text-sm">
            Dividend: ${stock.dividend}
          </p>
        )}
        {stock.dividendDate !== null && (
          <p className="text-sm">
            Dividend Date: {stock.dividendDate}
          </p>
        )}
        {stock.excludingDate !== null && (
          <p className="text-sm">
            Excluding Date: {stock.excludingDate}
          </p>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm">
          Score: {stock.score}
        </p>
        <p className="text-sm">
          Normalized Score: {stock.normalizeScore}
        </p>
      </div>
    </div>
  </div>
</div>

  );
};
export default ListingCard;
