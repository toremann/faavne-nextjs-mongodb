'use client';

import Button from '../Button';
import { useRouter } from 'next/navigation';

const StocksFooter = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="m-2">
      <Button label={'Tilbake'} onClick={handleClick} />
    </div>
  );
};

export default StocksFooter;
