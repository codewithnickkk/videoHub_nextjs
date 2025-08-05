import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";

// add trustHost in a type-safe way
const handler = NextAuth({ ...authOptions });
(handler as any).trustHost = true;

export { handler as GET, handler as POST };
