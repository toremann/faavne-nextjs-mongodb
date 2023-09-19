'use client';
import useFavorite from '@/app/hooks/useFavorite';
import HeartButton from '../HeartButton';
import PortfolioButton from '../PortfolioButton';
import scoreColor from '@/app/utils/scoreColor';
import { AiFillHeart } from 'react-icons/ai';

interface StocksUtilBoxProps {
  score: number;
  utbytte: number | null;
}

const StocksUtilBox: React.FC<StocksUtilBoxProps> = ({ score, utbytte }) => {
  return (
    <div className="flex items-center justify-between m-2">
      <div className={`${scoreColor(score)} text-white font-thin py-3 rounded-lg text-center mb-2 w-full mr-2 border-2`}>Utbytte: {utbytte} NOK</div>
      <div className={`${scoreColor(score)} text-white font-thin py-3 rounded-lg text-center mb-2 w-full mr-2 border-2`}>Score: {score}</div>
    </div>
  );
};

export default StocksUtilBox;
