'use client';

import { HiPlusSm } from 'react-icons/hi';

import useFavorite from '@/app/hooks/useFavorite';
import { SafeUser } from '@/app/types';

interface HeartButtonProps {
  stockId: string;
  currentUser?: SafeUser | null;
}

const PortfolioButton: React.FC<HeartButtonProps> = ({ stockId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    stockId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <HiPlusSm
        size={28}
        className="
          fill-neutral-500/70
        "
      />
    </div>
  );
};

export default PortfolioButton;
