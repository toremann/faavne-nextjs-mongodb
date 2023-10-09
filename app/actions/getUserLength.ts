import prisma from '@/app/libs/prismadb';

export default async function getAllStocks() {
  try {
    const users = await prisma.user.findMany();
    const usersCount = users.length;

    return usersCount
  } catch (error) {
    throw error;
  }
}