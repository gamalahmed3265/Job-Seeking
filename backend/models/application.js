import mongoose from "mongoose";
import validator from "validator";

const ApplicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide Your name1"],
        minLength:[3,"Name Must Contain at least 3 Characters"],
        maxLength:[30,"Name Con`t exceed 30 Characters"]
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
    coverLetter:{
        type:String,
        require:[true,"Please Provide Your cover Letter!"],
    },
    address:{
        type:String,
        require:[true,"Please Provide Your Address!"],
    },
    resume:{
        public_id:{
                type:String,
                require:[true,"Please Provide Your Public Id!"],
        },
        url:{
                type:String,
                require:[true,"Please Provide Your Url!"],
        }
    },
    applicationId:{
        user:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:true
            },
        role:{
            type:String,
            require:[true,"Please Provide Your Role!"],
            enum:["Job Seeker"]
        },        
    },
    employerID:{
        user:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:true
            },
        role:{
            type:String,
            require:[true,"Please Provide Your Role!"],
            enum:["Employer"]
        },        
    },
    createAt:{
        type:Date,
        default:Date.now
    },

})
export const ApplicationModel=mongoose.model("Application",ApplicationSchema)