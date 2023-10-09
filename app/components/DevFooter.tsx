'use client';
import React, { useEffect, useState } from 'react';

const DevFooter: React.FC = () => {
  const [currentSize, setCurrentSize] = useState<string>('');

  useEffect(() => {
    // Function to determine the current screen size
    const getCurrentSize = () => {
      if (window.innerWidth < 640) {
        return 'sm';
      } else if (window.innerWidth < 768) {
        return 'md';
      } else if (window.innerWidth < 1024) {
        return 'lg';
      } else {
        return 'xl';
      }
    };

    // Update currentSize when the window is resized
    const handleResize = () => {
      setCurrentSize(getCurrentSize());
    };

    // Initial calculation and event listener setup
    setCurrentSize(getCurrentSize());
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <footer className="fixed bottom-0 w-full bg-gray-200 text-center py-2 text-sm">Current Tailwind Size: {currentSize}</footer>;
};

export default DevFooter;
