'use client';

import { useRouter } from 'next/navigation';
import { PiListMagnifyingGlassBold } from 'react-icons/pi'

interface PageHeaderProps {
  title: string;
  subtitle: string;
  infobox?: {
    content: string;
    subContent: string;
    closed: Boolean;
  };
  link?: {
    linkBool: Boolean;
    linkUrl: string;
    linkText: string;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, link }) => {
  const router = useRouter();
  const infoBoxActive = false;

  return (
    <div className="flex flex-col sm:flex-row mb-2">
      <div className="w-full">
        <div className="text:text-sm md:text-2xl font-bold">{title}</div>
        <div className="font-light text-neutral-500">{subtitle}</div>
      </div>
      {link && link.linkBool && 
      <div className='w-full sm:justify-end flex'>
      <div className="text-sm flex  flex-row gap-2 cursor-pointer hover:underline underline-offset-2 underline-orange-600" onClick={() => router.push(`${link.linkUrl}`)}><PiListMagnifyingGlassBold size={20} /> {link.linkText}</div>
      </div>}
    </div>
  );
};

export default PageHeader;
