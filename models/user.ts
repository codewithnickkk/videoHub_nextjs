import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser{//here we have to assign variable types...shit!
    email: string;
    password: string;
    _id?:mongoose.Types.ObjectId; //the '?' in _id? means it is optional 
    createdAt?: Date;
    updatedAt?: Date;
}
//now we declare a new schema for useer

const userSchema = new Schema<IUser>(//this scheme contains which variables are mandatory or required also in what datatype
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    },
    {
        timestamps:true //this will handle createdAt and updatedAt...
    }
)

//here we will declaere a pre hook 

userSchema.pre("save", async function (next){//here the pre hook we be working before saving in database if the password is modified first it will hash itself using bcrypt then save
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();   
})

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema); //the first one checks if user is already present in models or else it create's one of type <IUser>

export default User;