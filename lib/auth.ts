//this page is for login purpose (authentication)
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectionToDatabase } from "./db";
import User from "../models/user";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions={
    providers:[
        CredentialsProvider({//this is predefined structure for credetials...shown in documentation
            name: "Credentials",
            credentials:{//we are not using any provider such as google github or facebook etc...we are using email (could be any domain not only gmail) and password
                email: {label:"email", type:"text"},
                password: {label:"password", type:"password"}
            },
            async authorize(credentials){//authenticating if registered or not and authorized user is given access
                if(!credentials?.email || !credentials.password){//checks if both fields are present
                    throw new Error("Missing Email or Password")
                }
                try{
                    await ConnectionToDatabase();//db connection request
                    const user = await User.findOne({email: credentials.email}) //checking if registered and a old user 

                    if(!user){ //this means new user
                        throw new Error("No user found");
                    }

                    const isvalid = await bcrypt.compare(//returns a boolean value 
                        credentials.password, user.password
                    )
                    if(!isvalid){//checks for password
                        throw new Error("Incorrect password")
                    }
                    return{//if password is correct returns
                        id: user._id.toString(),
                        email: user.email
                    }
                }
                catch(error){
                    throw error
                }
            }
        })
    ],
    callbacks:{//callback returns sessions=> which either can be stored in database or jwt (json web tokens=>client side)
        //we are using jwt
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token;
        },
        async session({session, token}) {
            if(session.user){
                session.user.id = token.id as string
            }
            return session;
        }
    },
    session:{
        strategy:"jwt",
        maxAge: 30*24*60*60,
    },
    //pages
    pages:{
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET
}