'use client';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';

interface AboutProps {
  stockCount: number;
  userCount: number;
  dividendCount: number;
}

const About: React.FC<AboutProps> = ({ stockCount, userCount, dividendCount }) => {
  const totalUsers = userCount;
  const totalStocks = stockCount;
  const totalDividendStocks = dividendCount

  return (
    <Container>
      <PageHeader title={'Om'} subtitle={'Hva er Faavne?'} />

      <div className="flex justify-center mt-8 space-x-4">
        {/* Total Users Card */}
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md text-center">
          <h3 className="text-md font-semibold">Brukere</h3>
          <p className="text-xl font-bold text-orange-500">{totalUsers}</p>
        </div>

        {/* Total Stocks Card */}
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md text-center">
          <h3 className="text-md font-semibold">Aksjer</h3>
          <p className="text-xl font-bold text-orange-500">{totalStocks}</p>
        </div>

        {/* Random Stat Card */}
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md text-center">
          <h3 className="text-md font-semibold">Aktive utbytter</h3>
          <p className="text-xl font-bold text-orange-500">{totalDividendStocks}</p>
        </div>
      </div>
    </Container>
  );
};
export default About;
