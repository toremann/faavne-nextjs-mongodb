import getCurrentUser from '@/app/actions/getCurrentUser';
import getStockById from '@/app/actions/getStockById';

import Stock from './Stock';

interface IParams {
  stock: string;
}

const StockPage = async ({ params }: { params: IParams }) => {
  const { stock: isin } = params;

  const stock = await getStockById(isin);
  const currentUser = await getCurrentUser();

  return <Stock stock={stock} currentUser={currentUser} />;
};

export default StockPage;
