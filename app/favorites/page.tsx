import getCurrentUser from '@/app/actions/getCurrentUser';
import getFavoriteStocks from '@/app/actions/getFavorites';

import Favorites from './Favorites';
import { Empty } from '../components/Empty';
import scoreColor from './../utils/scoreColor';

const FavoritesPage = async () => {
  const stocks = await getFavoriteStocks();
  const currentUser = await getCurrentUser();

  return <Favorites currentUser={currentUser} stocks={stocks} scoreColor={scoreColor} />;
};

export default FavoritesPage;
