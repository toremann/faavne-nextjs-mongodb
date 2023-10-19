'use client';

import { useRouter } from 'next/navigation';

import { GiSeaDragon } from 'react-icons/gi';

const Logo = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/')} className="flex flex-row items-center cursor-pointer group">
      <div className="transition-colors duration-300 group-hover:text-orange-500 dark:text-white">
        <GiSeaDragon size={48} className="transition-fill duration-300 group-hover:fill-orange-400" />
      </div>
      <div className="hidden sm:block ml-4 font-bold text-xl transition-colors duration-300 group-hover:text-orange-300 dark:text-white">Faavne.no</div>
    </div>
  );
};

export default Logo;
