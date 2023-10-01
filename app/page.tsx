import getCurrentUser from './actions/getCurrentUser';
import getStocks from './actions/getStocks';

import Container from './components/Container';
import { Empty } from './components/Empty';
import Heading from './components/Heading';
import StocksCard from './components/stocks/StocksCard';
import scoreColor from './utils/scoreColor';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const stocks = await getStocks();

  if (stocks.length === 0) {
    return <Empty />;
  }

  return (
    <Container>
      <div className="hidden md:block lg:block xl:block"><Heading title={'Aktive ubytter'} subtitle={'Aksjer med ubytte og datoer'}/></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {stocks.map((stock: any) => {
          return (
            
            
          <StocksCard key={stock.id} stock={stock} currentUser={currentUser} scoreColor={scoreColor} />
          
          );
        })}
      </div>
    </Container>
  );
}
