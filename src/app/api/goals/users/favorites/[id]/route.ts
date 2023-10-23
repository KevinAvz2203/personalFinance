import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const userGoals = await prisma.goal.groupBy({
      by: ["id", "name", "totalAmount", "currentAmount"],
      where: {
        userId: Number(params.id),
        isFavorite: true,
        isComplete: false,
      },
    });

    if (!userGoals)
      return NextResponse.json(
        { message: "No favorite goals found" },
        { status: 404 }
      );

    return NextResponse.json(userGoals);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
