import prisma from '@/app/libs/prismadb';

export default async function getStockById(isin: string) {
  try {
    if (!isin) {
      throw new Error('Invalid or missing isin parameter.');
    }

    const stock = await prisma.stock.findFirst({
      where: {
        isin: isin,
      },
    });

    if (!stock) {
      return null;
    }

    return stock;
  } catch (error) {
    throw error;
  }
}
