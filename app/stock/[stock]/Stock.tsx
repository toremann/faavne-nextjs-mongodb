'use client';

import { SafeUser } from '@/app/types';

import { Stock, Stats } from '@prisma/client';

import Container from '@/app/components/Container';
import Footer from '@/app/components/Footer';

// Stocks components
import StockHead from '@/app/components/stocks/StocksHead';
import StocksGraph from '@/app/components/stocks/StocksGraph';
import StocksDates from '@/app/components/stocks/StocksDates';
import StocksFooter from '@/app/components/stocks/StocksFooter';
import StocksUtilBox from '@/app/components/stocks/StocksUtilBox';
import StocksFooterAdd from '@/app/components/stocks/StocksFooterAdd';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 sm:gap-2 md:gap-2 lg:gap-8 shadow-custom rounded-md">
          <StocksGraph stats={stats} />
          <StocksDates dividendDate={stock.dividendDate} exDate={stock.excludingDate} />
          <StocksFooter />
          <StocksUtilBox score={stock.normalizeScore} utbytte={stock.dividend} />
        </div>
        <StocksFooterAdd stockId={stock.isin} currentUser={currentUser} />
      </div>
      <Footer />
    </Container>
  );
};

export default Stock;
