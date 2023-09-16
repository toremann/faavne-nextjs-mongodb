import prisma from '@/app/libs/prismadb';

export default async function getStocks() {
  try {
    const stocks = await prisma.stock.findMany({
      where: {
        dividend: { not: 0 },
      },
      orderBy: [{
        score: 'desc'
      }]
    });

    return stocks;
  } catch (error: any) {
    throw new Error(error);
  }
}
