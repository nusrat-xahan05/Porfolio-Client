import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
      accessToken?: string | null;
      refreshToken?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const result = await res.json();
          console.log('result: ', result);

          if (!result.success) {
            throw new Error(result.message || "Something Went Wrong");
          }

          return {
            id: result.data.user._id,
            name: result.data.user.name,
            email: result.data.user.email,
            role: result.data.user.role,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          throw new Error(err.message || "Login failed due to server error");
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login"
  },
}

