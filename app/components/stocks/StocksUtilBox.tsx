'use client';

import scoreColor from '@/app/utils/scoreColor';

interface StocksUtilBoxProps {
  score: number;
  utbytte: number | null;
}

const StocksUtilBox: React.FC<StocksUtilBoxProps> = ({ score, utbytte }) => {
  return (
    <div className="flex items-center justify-between m-2 gap-2">
      <div className={`bg-black dark:bg-black/50 dark:border-white/50 text-white md:font-thin py-3 rounded-lg text-center mb-2 w-full border-2`}>Utbytte: {utbytte} NOK</div>
      <div className={`${scoreColor(score)} text-white md:font-thin py-3 rounded-lg text-center mb-2 w-full border-2`}>Score: {score}</div>
    </div>
  );
};

export default StocksUtilBox;
