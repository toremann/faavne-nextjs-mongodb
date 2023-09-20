'use client';

import { AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai';

import useFavorite from '@/app/hooks/useFavorite';
import { SafeUser } from '@/app/types';

interface StockFooterProps {
  stockId: string;
  currentUser?: SafeUser | null;
}

const StocksFooterAdd: React.FC<StockFooterProps> = ({ stockId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    stockId,
    currentUser,
  });

  return (
    <div className="flex items-center justify-center p-4 space-x-4">
      <div onClick={toggleFavorite} className="transform hover:scale-110 cursor-pointer">
        <AiOutlineHeart size={24} className="text-red-700 hover:text-red-500" />
      </div>
      <div onClick={() => {}} className="transform hover:scale-110 cursor-pointer">
        <AiOutlinePlusCircle size={24} className="text-blue-700 hover:text-blue-500" />
      </div>
    </div>
  );
};

export default StocksFooterAdd;
