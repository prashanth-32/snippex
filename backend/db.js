import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`Connected to database!`);
    }
    catch(err){
        console.error("Error while connecting database ",err);
    }
}

export default connectDB;