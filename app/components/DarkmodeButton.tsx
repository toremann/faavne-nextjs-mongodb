'use client'

import { useEffect, useState } from "react";
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
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
    <div>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? <IoMdSunny size={16} /> : <IoMdMoon size={16}/>}
      </button>
    </div>
  );
};

export default DarkModeToggle;
