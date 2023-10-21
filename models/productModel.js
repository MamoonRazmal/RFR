import mongoose from "mongoose";
const productionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,


    },
    slug:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
       // type:Buffer,
        data:Buffer,
        contentType:String,
    },
    shipping:{
        type:Boolean,
        
    }

},{timestamps:true})
export default mongoose.model('Products',productionSchema)