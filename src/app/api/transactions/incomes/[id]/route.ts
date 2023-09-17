import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const transaction = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: Number(params.id),
        typeId: 1,
      },
    });

    if (!transaction)
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    return NextResponse.json(transaction._sum);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
