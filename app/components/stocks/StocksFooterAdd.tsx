'use client';

import { AiOutlineHeart, AiFillHeart, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

import useFavorite from '@/app/hooks/useFavorite';
import { SafeUser } from '@/app/types';
import usePortfolio from '@/app/hooks/usePortfolio';

interface StockFooterProps {
  stockId: string;
  currentUser?: SafeUser | null;
}

const StocksFooterAdd: React.FC<StockFooterProps> = ({ stockId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    stockId,
    currentUser,
  });

  const { isAddedToPortfolio, togglePortfolio } = usePortfolio({
    stockId,
    currentUser,
  });

  return (
    <div className="flex items-center justify-center p-4 space-x-4">
      <div onClick={toggleFavorite} className="transform hover:scale-110 cursor-pointer">
        {hasFavorited ? <AiFillHeart size={24} className="text-red-700 hover:text-red-500" /> : <AiOutlineHeart size={24} className="text-red-700 hover:text-red-500" />}
      </div>
      <div onClick={togglePortfolio} className="transform hover:scale-110 cursor-pointer relative">
        {isAddedToPortfolio ? <AiOutlineMinusCircle size={24} className="text-red-700 hover:text-red-500"/> : <AiOutlinePlusCircle size={24} className="text-blue-700 hover:text-blue-500"/> }
      </div>
    </div>
  );
};

export default StocksFooterAdd;
