import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const goals = await prisma.goals.findMany();
    return NextResponse.json(goals);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const { name, totalAmount, currentAmount, isComplete, isFavorite, userId } =
      await request.json();

    const newGoal = await prisma.goals.create({
      data: {
        name,
        totalAmount,
        currentAmount,
        isComplete,
        isFavorite,
        userId,
      },
    });

    console.log(newGoal);

    return NextResponse.json(newGoal);
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
