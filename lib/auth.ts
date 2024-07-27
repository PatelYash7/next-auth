import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { error } from "console";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const User = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (!User) {
            const data = await prisma.user.create({
              data: {
                email: credentials.email,
                password: credentials.password,
              },
            });
            return data;
          } else {
            const data = await prisma.user.findFirst({
              where: {
                email: credentials.email,
                password: credentials.password,
              },
            });
            return data;
          }
        } catch (e) {
          throw new Error();
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
