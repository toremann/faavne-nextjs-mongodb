import prisma from '@/app/libs/prismadb';

export default async function getStocks() {
  try {
    const stocks = await prisma.stocks.findMany({});

    return stocks;
  } catch (error: any) {
    throw new Error(error);
  }
}
