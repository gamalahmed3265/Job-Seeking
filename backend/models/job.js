import mongoose from "mongoose";
import validator from "validator"

const JobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Provide a title!"],
        minLength:[3,"Title Must Contain at least 3 Characters"],
        maxLength:[30,"Title Cont`nt exceed 50 Characters"]
    },
    description:{
        type:String,
        required:[true,"Please Provide a Description"],
        minLength:[3,"Description Must Contain at least 3 Characters"],
        maxLength:[350,"Description Cont`nt exceed 350 Characters"]
    },
    category:{
        type:String,
        required:[true,"Please Provide a Category"],
    },
    country:{
        type:String,
        required:[true,"Please Provide a Country"],
    },
    city:{
        type:String,
        required:[true,"Please Provide a City"],
    },
    location:{
        type:String,
        required:[true,"Please Provide a Location"],
        minLength:[50,"Location Must Contain at least 50 Characters"],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Fixed Salary Must Contain at least 4 Digits!"],
        maxLength:[9,"Fixed Salary Cont`nt exceed 50 Digits"]
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary From Must Contain at least 4 Digits!"],
        maxLength:[9,"Salary From Cont`nt exceed 50 Digits"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Salary To Must Contain at least 4 Digits!"],
        maxLength:[9,"Salary To Cont`nt exceed 50 Digits"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostOn:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
})


export const JobModel=mongoose.model("Job",JobSchema)