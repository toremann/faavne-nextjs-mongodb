'use client';

import { useRouter } from 'next/navigation';
import InfoBox from './InfoBox'; // Assuming the InfoBox component is in the same directory

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
    <div className="text-start flex flex-col md:flex-row mb-2">
      <div className="w-full">
        <div className="text:text-sm md:text-2xl font-bold">{title}</div>
        {link && link.linkBool && <div className="text-sm cursor-pointer hover:underline underline-offset-2 underline-orange" onClick={() => router.push(`${link.linkUrl}`)}>{link.linkText}</div>}
        <div className="font-light text-neutral-500">{subtitle}</div>
      </div>
    </div>
  );
};

export default PageHeader;
