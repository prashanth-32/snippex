import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"

const router = express.Router();

router.use(express.json());
router.use(cookieParser());

const salt = bcrypt.genSaltSync(10);

const secret = process.env.secret;

// Register
router.post('/register',async (req,res) => {
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password)
            return res.status(400).json({message:"Required every field!"});
        const userExists = await User.findOne({username:username});
        // console.log(userExists);
        if(userExists)
            return res.status(400).json({message:"User already exists"});
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create({username,email,password:hashedPassword});
        const token = jwt.sign({userId:user._id,username,email},secret,{expiresIn:"1d"});
        res.cookie('token',token);
        const data = {userId:user._id,username,email};
        res.status(201).json({data});
    }
    catch(err)
    {
        console.log(err);
        res.status(400).json({message:err});
    }
})


// Login
router.post('/login',async (req,res) => {
    try{
        const {username,password} = req.body;
        if(!username || !password)
            return res.status(400).json({message:"Required every field!"});
        const userExists = await User.findOne({username});
        if(!userExists)
            return res.status(400).json({message:"No user exists"});
        const passOk = await bcrypt.compare(password,userExists.password);
        if(!passOk) 
            return res.status(400).json({message:"Password incorrect"});
        
        const token = jwt.sign({userId:userExists._id,username,email:userExists.email},secret,{expiresIn:"1d"});
        res.cookie('token',token);
        const data = {userId:userExists._id,username,email:userExists.email};
        res.status(200).json({data});
    }
    catch(err)
    {
        res.status(400).json({message:err});
    }
})
// Logout
router.post('/logout',async (req,res) => {
    try{
        res.clearCookie('token');
        res.status(200).json('sucess');
    }
    catch(err)
    {
        res.status(400).json({message:err});
    }
})
// Get userInfo
router.get('/info',async (req,res) => {
    try{
        const token = req.cookies.token;
        const info = jwt.decode(token);
        res.status(200).json({info});
    }
    catch(err)
    {
        res.status(400).json({message:err});
    }
})

export default router;