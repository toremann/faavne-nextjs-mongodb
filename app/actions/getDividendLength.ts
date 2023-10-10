import prisma from '@/app/libs/prismadb';

export default async function getDividendLength() {
  try {
    const stocks = await prisma.stock.findMany({
      where: {
        dividend: { not: 0 },
      }
    });

    const dividendLength = stocks.length

    return dividendLength;
  } catch (error: any) {
    throw new Error(error);
  }
}
