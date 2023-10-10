'use client';

import { BiInfoCircle } from 'react-icons/bi';

interface InfoBoxProps {
  content: string;
  subcontent: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ content, subcontent }) => {
  return (
<div className="bg-yellow-300 text-black md:font-light py-3 rounded-lg text-center border-2 border-yellow-400 shadow-md flex items-center mb-2">
      <div className="flex-shrink-0">
        <BiInfoCircle className="text-2xl mx-2" />
      </div>
      <div className="flex-grow text-center">
        <p className="font-bold">{content}:</p>
        <p>{subcontent}</p>
      </div>
    </div>
  );
};

export default InfoBox;
