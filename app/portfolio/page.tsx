import getCurrentUser from '@/app/actions/getCurrentUser';
import scoreColor from './../utils/scoreColor';

import Portfolio from './Portfolio';
import getPortfolio from '../actions/getPortfolio';

interface IParams {
  stock: string;
}

const PortfolioPage = async () => {
  const stocks = await getPortfolio();
  const currentUser = await getCurrentUser();

  return <Portfolio currentUser={currentUser} stocks={stocks} scoreColor={scoreColor}/>;
};

export default PortfolioPage;
