import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Snippet from "../models/snippet.model.js";
import Comment from "../models/comment.model.js";

dotenv.config();
const router = express.Router();
const secret = process.env.secret;

router.use(cookieParser());
router.use(express.json());

//get all snippets
router.get('/',auth,async (req,res)=>{
    try{
        const data = await Snippet.find({}).sort({createdAt:-1});
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message:err});
    }
})

//get user snippets
router.get('/user/:id',auth,async (req,res)=>{
    try{
        const {id} = req.params;
        const data = await Snippet.find({author:id});
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json({message:err});
    }
})

//Create a snippet
router.post('/create',auth,async (req,res) =>{
    try{
        const snippet = await Snippet.create(req.body);
        res.status(200).json({message:"Created successfully!"});
    }
    catch(err){
        res.status(400).json({message:err});
    }
})

//Update a particular snippet
router.post('/update/:id',auth,async (req,res) =>{
    try{
        const {id} = req.params;
        await Snippet.findOneAndUpdate({_id:id},req.body);
        res.status(200).json({message:"Updated successfully!"});
    }
    catch(err){
        res.status(400).json({message:err});
    }
})

//Delete a particular snippet
router.delete('/:id',auth,async (req,res) =>{
    try{
        const {id} = req.params;
        await Snippet.findOneAndDelete({_id:id});
        res.status(200).json({message:"Deleted successfully"});
    }
    catch(err)
    {
        res.status(400).json({message:err});
    }
})

//To get particular snippet
router.get('/:id',auth,async (req,res)=>{
    try{
        const {id} = req.params;
        const snippet = await Snippet.find({_id:id}).sort({createdAt:-1});
        res.status(200).json(snippet);
    }
    catch(err){
        res.status(400).json({message:err});
    }
})

//To get comments on a snippet
router.get('/comments/:id',auth,async (req,res)=>{
    try{
        const {id} = req.params;
        const snippet = await Comment.find({postId:id}).sort({createdAt:-1});
        res.status(200).json(snippet);
    }
    catch(err){
        res.status(400).json({message:err});
    }
})

//To post comment on a snippet
router.post('/postComment/',auth,async (req,res)=>{
    try{
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    }
    catch(err)
    {
        res.status(400).json({message:err});
    }
})

//Middleware 
function auth(req,res,next)
{
    try{
        const token = req.cookies.token;
        if(!token) return res.status(400).json({message:"Not authorized!"});
        const ok = jwt.verify(token,secret);
        next();
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json(err);
    }
}

export default router;