import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("please define mongodb uri in env file")
}

let cached = global.mongoose; //this should return connection in cached

if(!cached){ //if not cached...it will assign null value
    cached = global.mongoose = {conn: null, promise: null}
}

export async function ConnectionToDatabase(){
    if(cached.conn){//if connection is already present in the cached.conn then directly return a connection 
        return cached.conn;
    }
    // If connection is not present in conn then check in promise
    if(!cached.promise){ //this "if" condition will be skipped if promise is already present and directly will jump to try&catch
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        cached.promise = (mongoose.connect(MONGODB_URI, opts)).then(()=> mongoose.connection);//this will create a promise
    }
    try{
        cached.conn = await cached.promise //here we wait for the promise to resolve() and return a value to conn 
    }
    catch(error){// incase any error will be directly displayed
        console.log(error);
    }

    return cached.conn; //at last we return a connection
}
//here we have sucessfully established a connection with database
