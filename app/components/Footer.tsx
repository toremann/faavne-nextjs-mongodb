'use client';

import Link from 'next/link';
import { FaGithub, FaLink, FaInfoCircle } from 'react-icons/fa';
import DarkModeToggle from './DarkmodeButton';
import { useState, useEffect } from 'react';

const Footer = () => {
  // Dirty hydration error fix
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  return (
    <footer className="flex-1 w-full text-center py-2 mt-10 text-xs dark:bg-black dark:text-white">
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <Link href="https://github.com/toremann" target="_blank" rel="noopener noreferrer">
            <div className="group flex flex-col items-center hover:text-blue-500">
              <div>
                <FaGithub size={16} />
              </div>
              <div>github</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <Link href="http://dnul.no" target="_blank" rel="noopener noreferrer">
            <div className="group flex flex-col items-center hover:text-blue-500">
              <div>
                <FaLink size={16} />
              </div>
              <div>www.dnul.no</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <Link href="/about">
            <div className="group flex flex-col items-center hover:text-blue-500">
              <div>
                <FaInfoCircle size={16} />
              </div>
              <div>info</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <div className="group flex flex-col items-center hover:text-blue-500">{loaded && <DarkModeToggle />}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
