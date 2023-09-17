import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        userId: Number(params.id),
      },
    });

    if (!transaction)
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );

    let total = 0;

    for (let i = 0; i < transaction.length; i++) {
      if (transaction[i].typeId == 1) {
        total += transaction[i].amount;
      } else {
        total -= transaction[i].amount;
      }
    }

    return NextResponse.json(total);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
