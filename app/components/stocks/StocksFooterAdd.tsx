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
        <AiOutlineHeart size={24} className={hasFavorited ? 'text-red-700 hover:text-black' : 'text-red-700 hover:text-red-500'} />
      </div>
      <div onClick={() => {}} className="transform hover:scale-110 cursor-pointer relative">
        <AiOutlinePlusCircle size={24} className="text-blue-700 hover:text-blue-500" />
        <span className="absolute opacity-0 transition-opacity duration-300 pointer-events-none hover:opacity-100 left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">Some Text Here</span>
      </div>
    </div>
  );
};

export default StocksFooterAdd;
