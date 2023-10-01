import prisma from '@/app/libs/prismadb';

export default async function getAllStocks() {
  try {
    const stocks = await prisma.stock.findMany({});

    return stocks;
  } catch (error: any) {
    throw new Error(error);
  }
}
