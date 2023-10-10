import getDividendLength from '../actions/getDividendLength';
import getStockLength from '../actions/getStockLength';
import getUserLength from '../actions/getUserLength';
import About from './About';

const AboutPage = async () => {
  const stockCount = await getStockLength();
  const userCount = await getUserLength();
  const dividendCount = await getDividendLength()

  return <About stockCount={stockCount} userCount={userCount} dividendCount={dividendCount} />;
};

export default AboutPage;
