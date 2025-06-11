import { AuthOptions } from "@/lib/nextauth";
import NextAuth from "next-auth/next";

const handler = NextAuth(AuthOptions);
export { handler as GET, handler as POST };