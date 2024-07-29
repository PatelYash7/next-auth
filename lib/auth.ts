import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
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
        console.log(credentials)
        try {
          const User = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          console.log(User)
          if (!User) {
            const user = await prisma.user.create({
              data: {
                email: credentials.email,
                password: credentials.password,
              },
            });
            return user;
          } else {
            const user = await prisma.user.findFirst({
              where: {
                email: credentials.email,
                password: credentials.password,
              },
            });
            return user;
          }
        } catch (e) {
          throw new Error();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user){
        token.id=user.id.toString()
        token.name = user.name?.toString();
        token.rollno = user.rollno
      }
      return token;
    },
    async session({ session,token }) {
      if(token){
        session.user.email=token.email
        session.user.name= token.name
        session.user.rollno= token.rollno
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
