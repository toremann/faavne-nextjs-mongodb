'use client';

import { useState } from 'react';

const StocksGraphFooter = () => {
  const [activeTab, setActiveTab] = useState('1dag');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    console.log(activeTab);
  };

  return (
    <div className="flex flex-row justify-evenly text-sm bg-slate-100 mt-2 p-1">
      <div
        className={`text-small ${activeTab === '1dag' ? 'underline' : ''} decoration-orange-600 decoration-4 underline-offset-8 hover:underline transition duration-300 cursor-pointer`}
        onClick={() => handleTabClick('1dag')}
      >
        1dag
      </div>
      <div
        className={`text-small ${activeTab === '1uke' ? 'underline' : ''} decoration-orange-600 decoration-4 underline-offset-8 hover:underline transition duration-300 cursor-pointer`}
        onClick={() => handleTabClick('1uke')}
      >
        1uke
      </div>
    </div>
  );
};

export default StocksGraphFooter;
