'use client';

import InfoBox from './InfoBox';  // Assuming the InfoBox component is in the same directory

interface PageHeaderProps {
  title: string;
  subtitle: string;
  infobox?: {
    content: string;
    subcontent: string;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, infobox }) => {
  return (
<div className="text-start flex flex-col md:flex-row">
  <div className="w-full md:w-1/3">
    <div className="text:text-sm md:text-2xl font-bold">{title}</div>
    <div className="font-light text-neutral-500">{subtitle}</div>
  </div>

  <div className="w-full md:w-2/3 flex-grow md:ml-5 justify-center align-middle">
    {infobox && <InfoBox content={infobox.content} subcontent={infobox.subcontent} />}
  </div>
</div>

  );
};

export default PageHeader;
