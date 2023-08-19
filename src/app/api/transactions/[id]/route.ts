import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: Number(params.id),
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

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteTransaction = await prisma.transaction.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deleteTransaction)
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    return NextResponse.json(deleteTransaction);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Transaction not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
