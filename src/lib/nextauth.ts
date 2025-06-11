import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const AuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async({ token }) => {
      const dbUser = await prisma.user.findFirst({
        where: {
          email:  token?.email
        }
      })
      if (dbUser) {
        token.id = dbUser.id;
      }
      return token;
    },
    session:( { session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string || ""
  })],
  adapter: PrismaAdapter(prisma)
}

export const getAuthsession = () => {
  return getServerSession(AuthOptions);
}