import getCurrentUser from '@/app/actions/getCurrentUser';
import getStockById from '@/app/actions/getStockById';

import { Empty } from '@/app/components/Empty';

import Stock from './Stock';

interface IParams {
  stock: string;
}

const StockPage = async ({ params }: { params: IParams }) => {
  const { stock: isin } = params;

  console.log('params page.tsx', isin);
  const stock = await getStockById(isin);
  const currentUser = await getCurrentUser();
  console.log(stock);

  return <Stock stock={stock} currentUser={currentUser} />;
};

export default StockPage;
