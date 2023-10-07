import prisma from '@/app/libs/prismadb';

import getCurrentUser from './getCurrentUser';

export default async function getPortfolioList() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const portfolioList = await prisma.portfolio.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return portfolioList;
  } catch (error: any) {
    throw new Error(error);
  }
}
