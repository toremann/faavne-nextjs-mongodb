import prisma from '@/app/libs/prismadb';

import getCurrentUser from './getCurrentUser';

export default async function getPortfolio() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const portfolio = await prisma.stock.findMany({
      where: {
        isin: {
          in: [...(currentUser.portfolioIds || [])],
        },
      },
    });

    return portfolio;
  } catch (error: any) {
    throw new Error(error);
  }
}
