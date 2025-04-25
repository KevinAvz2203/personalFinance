import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.users.findMany();
    return NextResponse.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, password, age } =
      await request.json();
    const newUser = await prisma.users.create({
      data: {
        first_name,
        last_name,
        email,
        password,
        age,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newUser);
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
