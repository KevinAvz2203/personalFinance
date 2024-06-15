import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";

export const authOptions = {
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },

      async authorize(credentials) {
        const userFound = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
          },
        });

        if (!userFound) throw new Error("User not found");

        const matchPassword = await compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Email or Password are incorrect");

        return {
          id: userFound.id,
          name: `${userFound.firstName} ${userFound.lastName}`,
          email: userFound.email,
        };
      },
    }),
  ],
  session: {
    maxAge: 4 * 60 * 60,
  },
  callbacks: {
    async session({ session }: { session: any }) {
      const userWithId = await prisma.users.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      session.user.id = userWithId?.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
