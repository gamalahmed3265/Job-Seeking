import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { JobModel } from "../models/job.js";

export const getAllJobs=catchAsyncError(async (req,res,next)=>{
    const jobs=await JobModel.find({
        expired:false
    });
    if (jobs.length<1){
        return next(new ErrorHandler("No Jobs Added Yeat! , Please Add More",404))
    }
    res.json({
        success:true,
        jobs
    })
})

export const postJob=catchAsyncError(async (req,res,next)=>{
    console.log(req.user);
    res.json({
        req:req.body
    })
})