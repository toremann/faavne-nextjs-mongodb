'use client';

import { Stock } from '@prisma/client';
import Container from '../components/Container';
import { Empty } from '../components/Empty';
import StockRow from '../components/portfolio/StockRow';
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
      <PageHeader title={'Portfolio'} subtitle={'Oversikt over planlagte utbyter'} />
      <table className="table-fixed max-w-xl">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Antall</th>
            <th>Utbytte</th>
          </tr>
        </thead>
        {stocks.map((stock: any) => {
          return <StockRow key={stock.isin} stock={stock} currentUser={currentUser} scoreColor={scoreColor} />;
        })}
      </table>
    </Container>
  );
};

export default Favorites;
