import mongoose from "mongoose";

const snippetSchema = mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    upvote:{
        type:Number,
        default:0
    },
    downvote:{
        type:Number,
        default:0
    },
    description:{
        type:String,
    },
    code:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const Snippet = new mongoose.model('snippet',snippetSchema);

export default Snippet;