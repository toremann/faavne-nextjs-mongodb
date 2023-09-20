import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteStocks() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favorites = await prisma.stock.findMany({
            where: {
                isin: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        return favorites
    } catch (error: any) {
        throw new Error(error);
    }
}