import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const Comment = new mongoose.model('comment',commentSchema);

export default Comment;