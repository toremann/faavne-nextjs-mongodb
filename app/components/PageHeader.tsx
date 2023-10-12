'use client';

import InfoBox from './InfoBox'; // Assuming the InfoBox component is in the same directory

interface PageHeaderProps {
  title: string;
  subtitle: string;
  infobox?: {
    content: string;
    subContent: string;
    closed: Boolean;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  const infoBoxActive = false;

  return (
    <div className="text-start flex flex-col md:flex-row mb-2">
      <div className="w-full">
        <div className="text:text-sm md:text-2xl font-bold">{title}</div>
        <div className="font-light text-neutral-500">{subtitle}</div>
      </div>
    </div>
  );
};

export default PageHeader;
