import getCurrentUser from '@/app/actions/getCurrentUser';
import scoreColor from './../utils/scoreColor';

import Portfolio from './Portfolio';
import getPortfolio from '../actions/getPortfolio';
import getPortfolioList from '../actions/getPortfolioList'

interface IParams {
  stock: string;
}

const PortfolioPage = async () => {
  const stocks = await getPortfolio();
  const currentUser = await getCurrentUser();
  const portfolioList = await getPortfolioList()

  return <Portfolio currentUser={currentUser} stocks={stocks} scoreColor={scoreColor} portfolio={portfolioList} />;
};

export default PortfolioPage;
