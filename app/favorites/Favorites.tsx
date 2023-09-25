'use client';

import { Stock } from '@prisma/client';
import Container from '../components/Container';
import { Empty } from '../components/Empty';
import StocksCard from '../components/stocks/StocksCard';

import scoreColor from '@/app/utils/scoreColor';
import { SafeUser } from '../types';
import PageHeader from '../components/PageHeader';

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
      <PageHeader title={'Mine favoritter'} subtitle={'Oversikt over aksjer som er lagt til i dine favoritter'} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {stocks.map((stock: any) => {
          return <StocksCard key={stock.isin} stock={stock} currentUser={currentUser} scoreColor={scoreColor} />;
        })}
      </div>
    </Container>
  );
};

export default Favorites;
