import mongoose, { Schema } from "mongoose"


export const Video_Dimension={
    height:1920,
    width:1080,
} as const

export interface IVideo{
    _id?:mongoose.Types.ObjectId,
    title: string,
    description: string,
    video_url: string,
    thumbnail_url: string,
    controls?: Boolean,
    transformation?:{
        height: number,
        width: number,
        quality:number,
    }
    createdAt: Date,
}

const videoSchema = new Schema<IVideo>({
    title:{type:String, required:true},
    description:{type:String, required:true},
    video_url:{type:String, required:true},
    thumbnail_url:{type:String, required:true},
    controls:{type:Boolean, default:true},
    transformation:{
        height:{type:Number, default:Video_Dimension},
        width:{type:Number, default:Video_Dimension},
        quality:{type:Number, min:1, max:100},
    },
},
{
    timestamps:true,
})

const Video = mongoose.models?.Video || mongoose.model<IVideo>("Video", videoSchema); //the first one checks if user is already present in models or else it create's one of type <IVideo>

export default Video;