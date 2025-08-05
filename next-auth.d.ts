import {DefaultSession} from "next-auth";

declare module "next-auth"{
    interface Session{ //session will have an object user which will have id as string
        user:{
            id: String;
        } & DefaultSession["user"];
    }
    
}
//done with this file now move to NextAuthOptions => lib/auth.ts