import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { stockAmount, stockId, user, stockName } = body;

  const portfolio = await prisma.portfolio.upsert({
    where: {
      unique_user_stock: {
        userId: user,
        stockId,
      },
    },
    create: {
      stockAmount,
      stockId,
      stockName,
      user: {
        connect: {
          id: user,
        },
      },
    },
    update: {
      stockAmount,
    },
  });

  return NextResponse.json(portfolio);
}
