/* Version 2 */
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

type userSumGoals = {
  totalSaved: number;
  totalGoalsAmount: number;
};

export async function GET(request: Request, { params }: Params) {
  try {
    const transactions = await prisma.transactions.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: Number(params.id),
      },
    });

    if (!transactions)
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );

    const userGoals = await prisma.goals.findMany({
      where: {
        userId: Number(params.id),
      },
    });

    if (!userGoals)
      return NextResponse.json(
        { message: "User goals not found" },
        { status: 404 }
      );

    const data: userSumGoals = {
      totalSaved: 0,
      totalGoalsAmount: 0,
    };

    for (let i = 0; i < userGoals.length; i++) {
      data.totalSaved += userGoals[i].currentAmount || 0;
      data.totalGoalsAmount += userGoals[i].totalAmount || 0;
    }

    // Subtract totalSaved from transactions sum
    transactions._sum.amount =
      (transactions._sum.amount ?? 0) - data.totalSaved;

    return NextResponse.json(transactions._sum);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
