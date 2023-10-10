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

  return <Stock stock={stock as any} stats={stats as any} currentUser={currentUser} />;
};

export default StockPage;
