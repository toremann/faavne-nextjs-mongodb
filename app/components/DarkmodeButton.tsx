'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme == 'system') {
      setTheme('light');
    }

    if (theme == 'dark') {
      setTheme('light');
    }
    if (theme == 'light') {
      setTheme('dark');
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={toggleTheme}>
      {theme === 'light' ? <IoMdSunny size={16} /> : <IoMdMoon size={16} />}
      </div>
      <div className="cursor-pointer" onClick={toggleTheme}>{theme}</div>
    </>
  );
};

export default DarkModeToggle;
