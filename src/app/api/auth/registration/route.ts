import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, password, age } =
      await request.json();

    const userFound = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const newUser = await prisma.users.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        age: age,
        updatedAt: new Date(),
      },
    });

    const { password: _, ...users } = newUser;

    return NextResponse.json(users);
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
