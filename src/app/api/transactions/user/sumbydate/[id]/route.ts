import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  const monthNum = new Date().getMonth() + 1;
  const currYear = new Date().getFullYear();
  const monthLen = new Date(currYear, monthNum, 0).getDate();

  try {
    const transaction = await prisma.transaction.groupBy({
      by: ["createdAt", "typeId", "amount"],
      where: {
        userId: Number(params.id),
        typeId: 2,
        createdAt: {
          lte: new Date(`${currYear}-${monthNum}-${monthLen}`).toISOString(), // "2022-01-30T00:00:00.000Z"
          gte: new Date(`${currYear}-${monthNum}-01`).toISOString(), // "2022-01-15T00:00:00.000Z"
        },
      },
    });

    if (!transaction)
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );

    return NextResponse.json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
