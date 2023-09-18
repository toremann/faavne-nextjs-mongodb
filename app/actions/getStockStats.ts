import prisma from "@/app/libs/prismadb";

export default async function getStockStats(isin: string) {
    try {

        if (!isin) {
            throw new Error('Invalid or missing isin parameter.');
        }

        const stats = await prisma.stats.findMany({
            where: {
                stockId: isin,
            }
        });

        if (!stats) {
            return null;
        }

        return stats;
    } catch (error) {
        throw error;
    }
}
