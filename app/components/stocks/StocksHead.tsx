'use client';

import Image from 'next/image';

import { SafeUser } from '@/app/types';

import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface StockHeadProps {
  title: string;
  subtitle: string;
  currentUser?: SafeUser | null;
}

const StockHead: React.FC<StockHeadProps> = ({ title, subtitle, currentUser }) => {
  return (
    <>
      <Heading title={title} subtitle={subtitle} />

      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      ></div>
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
