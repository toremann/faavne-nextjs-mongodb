import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
  stockId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { stockId } = params;

  if (!stockId || typeof stockId !== 'string') {
    throw new Error('Invalid ID');
  }

  let portfolioIds = [...(currentUser.portfolioIds || [])];

  portfolioIds.push(stockId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      portfolioIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { stockId } = params;

  if (!stockId || typeof stockId !== 'string') {
    throw new Error('Invalid ID');
  }

  let portfolioIds = [...(currentUser.portfolioIds || [])];

  portfolioIds = portfolioIds.filter((isin) => isin !== stockId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      portfolioIds,
    },
  });

  return NextResponse.json(user);
}
