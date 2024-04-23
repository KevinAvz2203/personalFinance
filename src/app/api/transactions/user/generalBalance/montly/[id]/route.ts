import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

type TransactionType = "t_incomes" | "t_expenses";
type TransactionSum = Record<TransactionType, number | null>;

function getCurrentMonthLength() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return { lte: endOfMonth.toISOString(), gte: startOfMonth.toISOString() };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { lte, gte } = getCurrentMonthLength();

    const transactions = await prisma.transactions.groupBy({
      by: ["typeId"],
      where: {
        userId: Number(params.id),
        createdAt: {
          lte,
          gte,
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Transform the result to match the expected format
    const result: TransactionSum = transactions.reduce((acc, curr) => {
      acc[curr.typeId === 1 ? "t_incomes" : "t_expenses"] = curr._sum.amount;
      return acc;
    }, {} as TransactionSum);

    if (transactions.length === 0) {
      return NextResponse.json(
        { t_incomes: 0, t_expenses: 0 },
        { status: 200 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
