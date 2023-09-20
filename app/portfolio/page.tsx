import getCurrentUser from '@/app/actions/getCurrentUser';

import Portfolio from './Portfolio';

interface IParams {
  stock: string;
}

const PortfolioPage = async () => {
  const currentUser = await getCurrentUser();

  return <Portfolio />;
};

export default PortfolioPage;
