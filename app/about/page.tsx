import getStockLength from '../actions/getStockLength';
import getUserLength from '../actions/getUserLength';
import About from './About';

const AboutPage = async () => {
  const stockCount = await getStockLength()
  const userCount = await getUserLength()

  return <About stockCount={stockCount} userCount={userCount} />;
};

export default AboutPage;
