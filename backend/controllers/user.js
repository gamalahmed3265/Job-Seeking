import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { UserModel } from "../models/user.js";
import { sendToken } from "../utils/jwtToken.js";

export const register=catchAsyncError(async(req,res,next)=>{
    const {name,email,password,role,phone}=req.body;
    if(!name || !email || !password || !role || !phone){
        return next(new ErrorHandler("Please Full Register Form"))
    }
    const isEmail=await UserModel.findOne({
        email
    })

    if (isEmail){
        return next(new ErrorHandler("Email aready exists!"))
    }
    const user=await UserModel.create({
        name,
        email,
        password,
        role,
        phone
    })

    sendToken(user,200,res,"user registered Successfully!")
}) 

export const login=catchAsyncError(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please Provide email,password and role",400))
    }
    
    const user=await UserModel.findOne({
        email
    }).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email,password",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email , Password",400))
    }
    if(user.role !== role){
        return next(new ErrorHandler("User With thsi Role Not Found",400));
    }
    sendToken(user,200,res,"user Login Successfully!")

})


export const logout=catchAsyncError(async(req,res,next)=>{
    const options={
        expire: new Date(Date.now()),
        httpOnly:true
    }
    res.status(201).cookie("token","",options).json({
        success:true,
        message:"User Logged out Successfuly"
    });
})
export const getUser=catchAsyncError(async(req,res,next)=>{
    const user=req.user;
    res.status(201).json({
        success:true,
        message:"Operation returned Successfuly",
        user
    });
})