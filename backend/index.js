import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRouter from "./routes/user.route.js"
import snippetRouter from "./routes/snippet.route.js"
import cors from "cors"

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use('/users',userRouter);
app.use('/snippets',snippetRouter);
app.use(express.json());

app.listen(4000,()=>{
    console.log(`App is listening at port ${PORT}`);
    connectDB();
});

app.get('/',(req,res) => {
    res.json("Working")
})
