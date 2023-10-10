import prisma from '@/app/libs/prismadb';

export default async function getStockStats(isin: string) {
  try {
    if (!isin) {
      throw new Error('Invalid or missing isin parameter.');
    }

    const currentTimestamp = Date.now();
    const startOfToday = new Date(currentTimestamp);
    startOfToday.setHours(0, 0, 0, 0); // Set to the beginning of the day

    const endOfToday = new Date(currentTimestamp);
    endOfToday.setHours(23, 59, 59, 999); // Set to the end of the day

    const stats = await prisma.stats.findMany({
      where: {
        stockId: isin,
        date: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    if (!stats) {
      return null;
    }

    return stats;
  } catch (error) {
    throw error;
  }
}
