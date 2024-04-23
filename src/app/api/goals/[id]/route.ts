import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const goal = await prisma.goals.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!goal)
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    return NextResponse.json(goal);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteGoal = await prisma.goals.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deleteGoal)
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    return NextResponse.json(deleteGoal);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Goal not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { name, totalAmount, currentAmount, isComplete, isFavorite } =
      await request.json();

    const updatedGoal = await prisma.goals.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        totalAmount,
        currentAmount,
        isComplete,
        isFavorite,
      },
    });

    return NextResponse.json(updatedGoal);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
}
