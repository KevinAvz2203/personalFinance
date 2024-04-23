import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const userGoals = await prisma.goals.findMany({
      where: {
        userId: Number(params.id),
      },
    });

    if (!userGoals)
      return NextResponse.json(
        { message: "User goals not found" },
        { status: 404 }
      );

    return NextResponse.json(userGoals);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
