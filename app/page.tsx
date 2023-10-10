// Actions
import getCurrentUser from './actions/getCurrentUser';
import getStocks from './actions/getStocks';

// Components
import Container from './components/Container';
import { Empty } from './components/Empty';
import PageHeader from './components/PageHeader';
import StocksCard from './components/stocks/StocksCard';

// Utils
import { getMarketStatusMessage } from './utils/marketStatus';
import scoreColor from './utils/scoreColor';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const stocks = await getStocks();
  const { content, subContent, closed } = getMarketStatusMessage();

  if (stocks.length === 0) {
    return <Empty />;
  }

  return (
    <Container>
      <div className="md:block lg:block xl:block">
        <PageHeader title={'Aktive utbytter'} subtitle={'Aksjer med ubytte og datoer'} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {stocks.map((stock: any) => {
          return <StocksCard key={stock.isin} stock={stock} currentUser={currentUser} scoreColor={scoreColor} />;
        })}
      </div>
    </Container>
  );
}
