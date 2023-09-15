'use client';

import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/')} className="font-bold text-xl text-black cursor-pointer">
      Faavne.no
    </div>
  );
};

export default Logo;
