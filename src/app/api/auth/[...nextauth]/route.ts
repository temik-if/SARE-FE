import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "select_account",
        },
      },
    }),

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
          }
          return null;
        } catch (error) {
          console.error("Error during authorization: ", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 horas
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user?.email,
                id_token: account.id_token,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            if (response.status == 401) {
              throw new Error("unauthorized");
            } else {
              console.log("Erro:", data?.message, response.status);
              throw new Error("server_error");
            }
          }

          if (!data.access_token) {
            throw new Error("invalid_token");
          }

          user.accessToken = data.access_token;
          user.id = data.user.id;
          user.name = data.user.full_name;
          user.profilePicture = user.image!!;
          user.email = data.user.email;
          user.isActive = data.user.is_active;
          user.type = data.user.type;
          user.createdAt = data.user.createdAt;

          return true;
        } catch (error) {
          console.error("Erro ao validar usuário:", error);
          let errorMessage = "unknown_error";

          if (
            typeof error === "object" &&
            error !== null &&
            "message" in error
          ) {
            const err = error as { message: string };
            if (err.message === "fetch failed") {
              errorMessage = "server_unreachable";
            } else if (err.message === "unauthorized") {
              errorMessage = "unauthorized";
            } else if (err.message === "server_error") {
              errorMessage = "server_error";
            } else if (err.message === "invalid_token") {
              errorMessage = "invalid_token";
            }
          }

          return `/login?error=${errorMessage}`;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isActive = user.isActive;
        token.type = user.type;
        token.createdAt = user.createdAt;
        token.accessToken = user.accessToken;
        token.picture = user.profilePicture;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.type = token.type as string;
        session.user.createdAt = token.createdAt as string;
        session.user.profilePicture = token.picture as string;
        session.accessToken = token.accessToken as string;
        session.idToken = token.idToken as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login?error=Unauthorized",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
