import getAllStocks from '../actions/getAllStocks';
import List from './List';

const StockPage = async () => {
  const allStocks = await getAllStocks();

  return (
    <List stocks={allStocks} />
  )
};

export default StockPage;
