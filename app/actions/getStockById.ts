import prisma from "@/app/libs/prismadb";

interface IParams {
    isin: string;
}

export default async function getStockById(isin) {
    try {
        console.log('getStockById:', isin)

        if (!isin) {
            throw new Error('Invalid or missing isin parameter.');
        }

        const stock = await prisma.stock.findFirst({
            where: {
                isin: isin,
            }
        });

        if (!stock) {
            return null;
        }

        return stock;
    } catch (error) {
        throw error;
    }
}
