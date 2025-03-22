// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    profilePicture?: string;
    accessToken: string;
    isActive: boolean;
    type: string;
    createdAt: string;
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      firstName: string;
      lastName: string;
      profilePicture?: string;
      email: string;
      isActive: boolean;
      type: string;
      createdAt: string;
    };
    accessToken?: string;
    idToken?: string;
  }
}
