import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import getCurrentUser from './actions/getCurrentUser';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ToasterProvider from './providers/ToasterProvider';
import DevFooter from './components/DevFooter';
import { Analytics } from '@vercel/analytics/react';
import getAllStocks from './actions/getAllStocks';
import Footer from './components/Footer';
import { getMarketStatusMessage } from './utils/marketStatus';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Faavne.no',
  description: 'Norske utbytte aksjer',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  const stocks = await getAllStocks();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar currentUser={currentUser} stocks={stocks as any} />
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <div className="pt-28">{children}</div>
        <Analytics />
        {/* <DevFooter /> */}
        <Footer />
      </body>
    </html>
  ); 

}
