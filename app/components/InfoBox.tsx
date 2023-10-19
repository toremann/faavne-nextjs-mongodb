'use client';

import { BiInfoCircle } from 'react-icons/bi';

interface InfoBoxProps {
  content: string;
  subContent: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ content, subContent }) => {
  return (
    <div className="bg-yellow-200 border-yellow-300 dark:opacity-70 text-black md:font-light py-3 rounded-lg text-center border-2  shadow-md flex items-center mb-2">
      <div className="flex-shrink-0">
        <BiInfoCircle className="text-2xl mx-2" />
      </div>
      <div className="flex-grow text-center">
        <p className="font-bold">{content}</p>
        <p>{subContent}</p>
      </div>
    </div>
  );
};

export default InfoBox;
