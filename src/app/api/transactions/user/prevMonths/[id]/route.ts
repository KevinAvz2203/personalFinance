import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        date: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 5)),
        },
        userId: Number(params.id),
        typeId: 2,
      },
      select: {
        date: true,
        amount: true,
        categoryId: true,
      },
    });

    const result = transactions.map((transactions) => ({
      month: transactions.date.getMonth() + 1, // Add 1 because getMonth() returns 0-based index
      total_amount: transactions.amount,
      Categoria: transactions.categoryId,
    }));

    const summedResult: Record<
      string,
      { month: number; Categoria: string; total_amount: number }
    > = {};

    for (const current of result) {
      const key = `${current.month}-${current.Categoria}`;
      if (!summedResult[key]) {
        summedResult[key] = {
          month: current.month,
          Categoria: current.Categoria.toString(),
          total_amount: 0,
        };
      }
      summedResult[key].total_amount += current.total_amount;
    }

    const finalResult = Object.values(summedResult);

    const sortedResult = finalResult.sort((a, b) => {
      if (a.month !== b.month) {
        return a.month - b.month;
      } else {
        return a.Categoria.localeCompare(b.Categoria); // Sort Categoria as strings
      }
    });

    if (!sortedResult)
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    return NextResponse.json(sortedResult);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
