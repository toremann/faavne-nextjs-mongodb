'use client';

import { Stock } from '@prisma/client';
import Container from '../components/Container';
import { Empty } from '../components/Empty';
import StockRow from '../components/portfolio/StockRow';
import { SafeUser } from '../types';
import PageHeader from '../components/PageHeader';
import StockRowHead from '../components/portfolio/StockRowHead';
import Divident from '../components/portfolio/Divident';

interface FavoritesProps {
  stocks: Stock[];
  currentUser?: SafeUser | null;
  scoreColor: (score: number) => string;
}

const Favorites: React.FC<FavoritesProps> = ({ stocks, currentUser, scoreColor }) => {
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
            <StockRowHead />

            <div className="md:col-span-3">
              <div className="">
                {stocks.map((stock: any) => (
                  <StockRow key={stock.isin} stock={stock} currentUser={currentUser} scoreColor={scoreColor} />
                ))}
              </div>
            </div>

            <div className="md:col-span-1">
              <Divident />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Favorites;
