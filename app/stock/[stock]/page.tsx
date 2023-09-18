import getCurrentUser from '@/app/actions/getCurrentUser';
import getStockById from '@/app/actions/getStockById';

import Stock from './Stock';
import getStockStats from '@/app/actions/getStockStats';

interface IParams {
  stock: string;
}

const StockPage = async ({ params }: { params: IParams }) => {
  const { stock: isin } = params;

  const stock = await getStockById(isin);
  const stats = await getStockStats(isin);
  const currentUser = await getCurrentUser();

  console.log('stats', stats);

  return <Stock stock={stock} stats={stats} currentUser={currentUser} />;
};

export default StockPage;
