'use client';

import { useRouter } from 'next/navigation';

import { GiSeaDragon } from 'react-icons/Gi';

const Logo = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/')} className="flex flex-row items-center cursor-pointer group">
      <div className="transition-colors duration-300 group-hover:text-blue-500">
        <GiSeaDragon size={48} className="transition-fill duration-300 group-hover:fill-blue-500" />
      </div>
      <div className="ml-4 font-bold text-xl transition-colors duration-300 group-hover:text-blue-500">Faavne.no</div>
    </div>
  );
};

export default Logo;
