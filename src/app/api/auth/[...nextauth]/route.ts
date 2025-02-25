import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const { access_token, user } = response.data;

          if (user && access_token) {
            
            return {
              id: user.id,
              name: user.full_name, 
              email: user.email,
              isActive: user.is_active,
              type: user.type,
              createdAt: user.createdAt,
              accessToken: access_token, 
            };
          } else {
            console.error("Error during authorization:", response.data);
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, //2 hours
  },
  jwt: {
    maxAge: 2 * 60 * 60, // 2 hours
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user.name) {
        token.name = session?.user.name;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isActive = user.isActive;
        token.type = user.type;
        token.createdAt = user.createdAt;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.type = token.type as string;
        session.user.createdAt = token.createdAt as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
