'use client';
import useFavorite from '@/app/hooks/useFavorite';
import HeartButton from '../HeartButton';
import PortfolioButton from '../PortfolioButton';

import scoreColor from '@/app/utils/scoreColor';

interface StocksUtilBox {
  score: number;
}

const StocksUtilBox = ({ score }) => {
  return (
    <div className="flex items-center justify-between m-2">
      <div className={`${scoreColor(score)} text-white font-semibold py-3 w-full rounded-lg text-center`}>Score: {score}</div>
      <div className="flex items-center m-2">
        <HeartButton />
        <PortfolioButton />
      </div>
    </div>
  );
};

export default StocksUtilBox;
