import getCurrentUser from './actions/getCurrentUser';
import getStocks from './actions/getStocks';

import Container from './components/Container';
import { Empty } from './components/Empty';
import StocksCard from './components/stocks/StocksCard';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const stocks = await getStocks();

  if (stocks.length === 0) {
    return <Empty />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {stocks.map((stock: any) => {
          return <StocksCard key={stock.id} stock={stock} currentUser={currentUser} />;
        })}
      </div>
    </Container>
  );
}
