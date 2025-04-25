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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        const userFound = await prisma.users.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            password: true,
          },
        });

        if (!userFound) throw new Error("Invalid credentials");

        const matchPassword = await compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Invalid credentials");

        return {
          id: userFound.id.toString(), // Convert id to string
          name: `${userFound.first_name} ${userFound.last_name}`,
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
      if (!session?.user?.email) {
        throw new Error("Session is missing user email");
      }

      const userWithId = await prisma.users.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });

      if (!userWithId) {
        throw new Error("User not found in session callback");
      }

      session.user.id = userWithId.id.toString(); // Convert id to string
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
