import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const period = request.nextUrl.searchParams.get("period") as string;

  let dateOffset;
  switch (period) {
    case "Weekly":
      dateOffset = 7; // Last 30 days for monthly
      break;
    case "Monthly":
      dateOffset = 30; // Last 365 days for yearly
      break;
    case "Yearly":
    default:
      dateOffset = 365; // All transactions for 'AllTime'
      break;
  }

  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        userId: Number(params.id),
        date:
          dateOffset === Infinity
            ? {}
            : {
                gte: new Date(
                  new Date().setDate(new Date().getDate() - dateOffset)
                ),
              },
      },
      include: {
        categories: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (!transactions)
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );

    return NextResponse.json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
