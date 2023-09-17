import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(params.id),
      },
/*       include: {
        goal: true,
        transaction: true,
      }, */
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deleteUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(deleteUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
