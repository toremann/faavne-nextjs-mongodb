'use client';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeUser } from '@/app/types';

import StockHead from '@/app/components/stocks/StocksHead';

import Container from '@/app/components/Container';
import { Stock } from '@prisma/client';
import StocksInfo from '@/app/components/stocks/StocksInfo';

interface StockProps {
  stock: Stock;
  currentUser: SafeUser | null;
}

const Stock: React.FC<StockProps> = ({ stock, currentUser }) => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <StockHead title={stock.name} subtitle={stock.symbol} currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default Stock;
