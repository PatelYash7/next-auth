import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    rollno?: string;
  }
  interface Session {
    user: {
      id?: string;
      rollno?: string;
      name?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    rollno?: string;
    name?: string;
  }
}
