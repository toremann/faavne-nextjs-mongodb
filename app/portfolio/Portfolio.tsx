'use client';

import { Portfolio, Stock } from '@prisma/client';

import Container from '../components/Container';
import { Empty } from '../components/Empty';
import StockRow from '../components/portfolio/StockRow';
import PageHeader from '../components/PageHeader';

import { SafeUser } from '../types';

interface PortfolioProps {
  stocks: Stock[];
  portfolio: Portfolio[];
  currentUser?: SafeUser | null;
}

const Portfolio: React.FC<PortfolioProps> = ({ stocks, currentUser, portfolio }) => {
  if (stocks.length === 0) {
    return <Empty />;
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <PageHeader title={'Portfolio'} subtitle={'Oversikt over planlagte utbytter'} />
          <div>
            <div className="md:col-span-1"></div>
            <table className="w-full border-b-2">
              <thead>
                <tr className="border-b-2">
                  <th className="w-full sm:w-auto text-left">Navn</th>
                  <th className="w-full sm:w-auto text-left">Utbytte</th>
                  <th className="w-full sm:w-auto text-left">Antall</th>
                  <th className="w-full sm:w-auto text-left">Utbytte totalt</th>
                  <th className="w-full sm:w-auto text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock: any) => (
                  <StockRow key={stock.isin} stock={stock} currentUser={currentUser} portfolio={portfolio} />
                ))}
              </tbody>
            </table>
            <br />
            <p>Utbytte totalt: 0 NOK</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Portfolio;
