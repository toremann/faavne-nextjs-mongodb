'use client';

// Imports
import { TbBrandTailwind, TbBrandNextjs, TbBrandPrisma, TbBrandMongodb, TbBrandTypescript, TbBrandVercel, TbBrandGithub, TbBrandUbuntu, TbBrandGoogle } from 'react-icons/tb';

// Components
import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import Link from 'next/link';

interface AboutProps {
  stockCount: number;
  userCount: number;
  dividendCount: number;
}

const About: React.FC<AboutProps> = ({ stockCount, userCount, dividendCount }) => {
  const totalUsers = userCount;
  const totalStocks = stockCount;
  const totalDividendStocks = dividendCount;

  return (
    <Container>
      <PageHeader title={'Om'} subtitle={'Hva er Faavne?'} />

      <div className="bg-white dark:bg-gray-800/75 dark:text-white p-4 rounded-md shadow-md w-full grid grid-cols-2 gap-4 divide-black divide-x divide-dotted">
        <div className="col-span-2 md:col-span-1 p-4">
          <h3 className="text-lg font-semibold mb-2">Utbytte aksjer</h3>
          <p className="text-base text-gray-600 mb-4">Aksjer oppdateres hver time i børsens åpningstid.</p>
          <h3 className="text-lg font-semibold mb-2">Bruker</h3>
          <p className="text-base text-gray-600 mb-4">Som registrert bruker kan du legge aksjer til i en portfolio og se totalt utbytte, som bruker kan du også legge aksjer til en favoritt liste. </p>
          <div className="text-right">
            <Link href={'https://github.com/toremann/faavne-nextjs-mongodb'} className="text-sm text-orange-500">
              Åpen kildekode..
            </Link>
          </div>
        </div>

        <div className="p-4 col-span-2 md:col-span-1">
          <h3 className="text-lg font-semibold mb-2">Tech stack:</h3>
          <div className="flex items-center space-x-4">
            <TbBrandNextjs size={40} />
            <TbBrandTailwind size={40} />
            <TbBrandPrisma size={40} />
            <TbBrandMongodb size={40} />
            <TbBrandTypescript size={40} />
            <TbBrandVercel size={40} />
            <TbBrandGithub size={40} />
            <TbBrandUbuntu size={40} />
            <TbBrandGoogle size={40} />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center mt-8 gap-4 justify-between">
        <div className="bg-white dark:bg-gray-800/50 dark:text-white p-4 rounded-md shadow-md w-full text-center">
          <h3 className="text-md font-semibold">Brukere</h3>
          <p className="text-xl font-bold text-orange-500">{totalUsers}</p>
        </div>

        <div className="bg-white dark:bg-gray-800/50 dark:text-white  p-4 rounded-md shadow-md w-full text-center">
          <h3 className="text-md font-semibold">Aksjer</h3>
          <p className="text-xl font-bold text-orange-500">{totalStocks}</p>
        </div>

        <div className="bg-white dark:bg-gray-800/50 dark:text-white  p-4 rounded-md shadow-md w-full text-center">
          <h3 className="text-md font-semibold">Aktive utbytter</h3>
          <p className="text-xl font-bold text-orange-500">{totalDividendStocks}</p>
        </div>
      </div>
    </Container>
  );
};
export default About;
