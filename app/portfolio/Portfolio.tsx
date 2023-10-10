'use client';

// Prisma
import { Portfolio, Stock } from '@prisma/client';

// Components
import Container from '../components/Container';
import { Empty } from '../components/Empty';
import StockRow from '../components/portfolio/StockRow';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';

// Types
import { SafeUser } from '../types';

import { useState } from 'react';

// Utils
import { formatCurrency } from '../utils/formatCurrency';

interface PortfolioProps {
  stocks: Stock[];
  portfolio: Portfolio[];
  currentUser?: SafeUser | null;
}

const Portfolio: React.FC<PortfolioProps> = ({ stocks, currentUser, portfolio }) => {
  const [totalDividendAmount, setTotalDividendAmount] = useState<number>(0);

  if (stocks.length === 0) {
    return <Empty />;
  }

  const updateTotalDividendAmount = () => {
    const newTotal = portfolio.reduce((total, entry) => {
      const stock = stocks.find((s) => s.isin === entry.stockId);
      return total + (stock?.dividend || 0) * entry.stockAmount;
    }, 0);
    setTotalDividendAmount(newTotal);
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <PageHeader title={'Portfolio'} subtitle={'Utbytte kalkulator'} />
          <div>
            <div className="md:col-span-1"></div>
            <table className="w-full border-b-2">
              <thead>
                <tr className="border-b-2">
                  <th className="text-sm md:text-base text-left">Navn</th>
                  <th className="text-sm md:text-base text-left">Utbytte</th>
                  <th className="text-sm md:text-base text-left"></th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock: any) => (
                  <StockRow key={stock.isin} stock={stock} currentUser={currentUser} portfolio={portfolio} updateTotalDividendAmount={updateTotalDividendAmount} />
                ))}
              </tbody>
            </table>
            <br />
            <div className="bg-black text-white md:font-light py-3 rounded-lg text-center mb-2 w-full border-2">
              Utbytte totalt: {formatCurrency(totalDividendAmount)} NOK
            </div>
            <InfoBox content="Utbytte formel" subContent="Utbytte * antall aksjer = totalt utbytte" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Portfolio;
