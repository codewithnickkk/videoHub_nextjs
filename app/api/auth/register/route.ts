//registering a user and storing in database
import { NextRequest, NextResponse } from "next/server";
import { ConnectionToDatabase } from "../../../../lib/db";
import User from "../../../../models/user";

export async function POST(request: NextRequest){
    try{
        const {email, password} = await request.json();
        if(!email || !password){ //if email or password fields are empty this will be returned
            return NextResponse.json(
                {error: "Email & Password are required"},
                {status: 400}
            )
        }
        //if both fields are set then..
        await ConnectionToDatabase();
        //we are registering and not logging so check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            alert("Email already registered!")
            return NextResponse.json(
                {error: "Email already registered!"},
                {status: 400}
            )
        }

        //now if both fields are filled and not an existing user then create a user
        await User.create(//this is mongodb property to create new entry
            {email, password}
        )
        return NextResponse.json(
            {message: "Email sucessfully registered!"},
            {status: 201}
        )
    }
    catch(error){//incase any error
        console.log(error)
        return NextResponse.json(
            {error: "Failed to register the user!"},
            {status: 500}
        )
    }
}
//this is the logic for registering a user!