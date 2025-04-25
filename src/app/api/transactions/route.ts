import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transactions.findMany(); // Modelo `transactions` en minúsculas
    return NextResponse.json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const { description, amount, userId, categoryId, typeId } =
      await request.json();

    const newTransaction = await prisma.transactions.create({
      data: {
        description,
        amount,
        userId,
        categoryId,
        typeId,
      },
    });

    return NextResponse.json(newTransaction);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
