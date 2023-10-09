'use client';

import {IoMdArrowRoundBack} from 'react-icons/io'

import Button from '../Button';
import { useRouter } from 'next/navigation';

const StocksFooter = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className="m-2 order-last sm:order-none md:order-none">
      <Button label={'Tilbake'} icon={IoMdArrowRoundBack} onClick={handleClick} outline={true}/>
    </div>
  );
};

export default StocksFooter;
