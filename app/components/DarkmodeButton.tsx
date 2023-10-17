'use client';

import { useEffect, useState } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined' && (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)),
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={toggleDarkMode}>
        {isDarkMode ? <IoMdSunny size={16} /> : <IoMdMoon size={16} />}
      </div>
      <div>{isDarkMode ? 'Dark' : 'Light'}</div>
    </>
  );
};

export default DarkModeToggle;
