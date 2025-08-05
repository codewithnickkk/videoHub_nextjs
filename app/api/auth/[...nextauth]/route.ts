import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";

// add trustHost in a type-safe way
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
