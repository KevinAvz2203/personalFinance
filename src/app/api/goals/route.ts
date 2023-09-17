import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const goals = await prisma.goal.findMany();
    return NextResponse.json(goals);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const { name, totalAmount, currentAmount, isComplete, userId } =
      await request.json();
    const newGoal = await prisma.goal.create({
      data: {
        name,
        totalAmount,
        currentAmount,
        isComplete,
        userId,
      },
    });

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
