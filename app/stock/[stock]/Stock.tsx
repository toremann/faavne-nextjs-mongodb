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
import StocksDates from '@/app/components/stocks/StocksDates';
import StocksFooter from '@/app/components/stocks/StocksFooter';
import StocksUtilBox from '@/app/components/stocks/StocksUtilBox';

interface StockProps {
  stock: Stock;
  stats: Stats[];
  currentUser: SafeUser | null;
}

const Stock: React.FC<StockProps> = ({ stock, stats, currentUser }) => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <StockHead title={stock.name} subtitle={stock.symbol} price={stock.price} pct={stock.pct} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8 shadow-md">
          <StocksGraph stats={stats} />
          <StocksDates dividendDate={stock.dividendDate} exDate={stock.excludingDate} />
          <StocksFooter />
          <StocksUtilBox score={stock.normalizeScore} />
        </div>
      </div>
    </Container>
  );
};

export default Stock;
