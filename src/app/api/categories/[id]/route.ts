import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const categories = await prisma.categories.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!categories)
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    return NextResponse.json(categories);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteCategory = await prisma.categories.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deleteCategory)
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    return NextResponse.json(deleteCategory);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
