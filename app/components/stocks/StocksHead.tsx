'use client';

import { SafeUser } from '@/app/types';
import HeartButton from '../HeartButton';

interface StockHeadProps {
  title: string;
  subtitle: string;
  currentUser?: SafeUser | null;
}

const StockHead: React.FC<StockHeadProps> = ({ title, subtitle, currentUser }) => {
  return (
    <>
      <div className="text-start">
        <div className="text-2xl font-bold">{title}</div>
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      </div>
      <div
        className="
            absolute
            top-5
            right-5
          "
      >
        <HeartButton currentUser={currentUser} />
      </div>
    </>
  );
};

export default StockHead;
