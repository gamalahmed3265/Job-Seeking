import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userScahma=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide Your name1"],
        minLength:[3,"Name Must Contain at least 3 Characters"],
        maxLength:[30,"Name Connect`t exceed 30 Characters"]
    },
    email:{
        type:String,
        required:[true,"Please Provide Your email!"],
        validate:[validator.isEmail,"Please Provide Your email!"]
    },
    phone:{
        type:Number,
        require:[true,"Please Provide Your Phone!"]
    },
    password:{
        type:String,
        require:[true,"Please Provide Your Password!"],
        minLength:[3,"Password Must Contain at least 3 Characters"],
        maxLength:[30,"Password Connect`t exceed 30 Characters"],
        select:false
    },
    role:{
        type:String,
        require:[true,"Please Provide Your Role!"],
        enum:["Job Seeker","Employer"]
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

// Hashing The Password

userScahma.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

// Comparing Password

userScahma.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// Genrate JWT TOKEN FOR AUTHORIZED

userScahma.methods.getJWTToken=function(){
    return jwt.sign({
        id: this._id
    },process.env.JWT_SECURE_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    }
    
    )
}


export const userModel=mongoose.model("User",userScahma)