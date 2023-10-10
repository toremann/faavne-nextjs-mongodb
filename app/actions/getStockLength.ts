import prisma from '@/app/libs/prismadb';

export default async function getAllStocks() {
  try {
    const stocks = await prisma.stock.findMany();
    const stockCount = stocks.length;

    return stockCount;
  } catch (error) {
    throw error;
  }
}
