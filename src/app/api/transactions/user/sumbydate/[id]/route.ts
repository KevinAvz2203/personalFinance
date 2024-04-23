import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const period = request.nextUrl.searchParams.get("period") as string;

  let dateOffset;
  switch (period) {
    case "Monthly":
      dateOffset = 30;
      break;
    case "Yearly":
      dateOffset = 3665;
      break;
    case "Weekly":
    default:
      dateOffset = 7;
      break;
  }

  try {
    const transactions = await prisma.transactions.groupBy({
      by: ["createdAt", "amount"],
      where: {
        userId: Number(params.id),
        typeId: 2,
        createdAt:
          dateOffset === Infinity
            ? {}
            : {
                gte: new Date(
                  new Date().setDate(new Date().getDate() - dateOffset)
                ),
              },
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
