// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    isActive: boolean;
    type: string;
    createdAt: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isActive: boolean;
      type: string;
      createdAt: string;
    };
    accessToken?: string;
  }
}
