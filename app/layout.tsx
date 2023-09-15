import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import getCurrentUser from './actions/getCurrentUser';
import Navbar from './components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Faavne.no',
  description: 'Norske utbytte aksjer',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
