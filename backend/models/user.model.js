import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            unique:true
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
        }
    },
    {
        timestamps:true
    }
);

const User = new mongoose.model('user',userSchema);

export default User;