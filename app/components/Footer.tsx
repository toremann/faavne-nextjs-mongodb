'use client';

import Link from 'next/link';
import { FaGithub, FaLink, FaInfoCircle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex-1 w-full text-center py-2 mt-10 text-sm">
      <div className="flex justify-center space-x-4">
        {/* GitHub Link */}
        <div className="flex flex-col items-center">
          <Link href="https://github.com/toremann" target="_blank" rel="noopener noreferrer">
            <div className="group flex flex-col items-center hover:text-blue-500">
              <div><FaGithub size={24} /></div>
              <div>Github</div>
            </div>
          </Link>
        </div>

        {/* DNUL Link */}
        <div className="flex flex-col items-center">
          <Link href="http://dnul.no" target="_blank" rel="noopener noreferrer">
            <div className="group flex flex-col items-center hover:text-blue-500">
              <div><FaLink size={24} /></div>
              <div>www.dnul.no</div>
            </div>
          </Link>
        </div>

        {/* About Link */}
        <div className="flex flex-col items-center">
          <Link href="/about">
            <div className="group flex flex-col items-center hover:text-blue-500">
              <div><FaInfoCircle size={24} /></div>
              <div>About</div>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
