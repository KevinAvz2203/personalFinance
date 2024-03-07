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
      dateOffset = 30; // Last 30 days for yearly
      break;
    case "Weekly":
    default:
      dateOffset = 7; // Last 7 days for monthly
      break;
  }

  try {
    const transaction = await prisma.transaction.groupBy({
      by: ["createdAt", "typeId", "amount"],
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
