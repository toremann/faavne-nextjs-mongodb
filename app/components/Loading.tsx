'use client';

import { PulseLoader } from 'react-spinners';

const Loader = () => {
  const isDarkMode = typeof window !== 'undefined' && (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));

  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center
    "
    >
      <PulseLoader size={20} color={!isDarkMode ? 'black' : 'white'} />
      <div className="text-black dark:text-white">Henter data..</div>
    </div>
  );
};

export default Loader;
