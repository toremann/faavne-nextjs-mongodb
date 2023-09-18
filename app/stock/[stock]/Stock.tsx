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
import { Stock, Stats } from '@prisma/client';
import StocksGraph from '@/app/components/stocks/StocksGraph';

interface StockProps {
  stock: Stock;
  stats: Stats[];
  currentUser: SafeUser | null;
}

const Stock: React.FC<StockProps> = ({ stock, stats, currentUser }) => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <StockHead title={stock.name} subtitle={stock.symbol} currentUser={currentUser} />
        <StocksGraph stats={stats} />
      </div>
    </Container>
  );
};

export default Stock;
