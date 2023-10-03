import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { stockAmount, stockId, user } = body;

    const portfolio = await prisma.portfolio.create({
        data: {
            stockAmount,
            stockId,
            user,
        },
    });

    return NextResponse.json(portfolio);
}
