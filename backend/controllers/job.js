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
    const {role,_id}=req.user;
    if(role==="Job Seeke"){
        return next(
            new ErrorHandler("Job Seeke is Not Allowed access to resource",400)
        )
    }

    const {title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    }=req.body;

    if( !title||
        !description||
        !category||
        !country||
        !city||
        !location){
            return next(
                new ErrorHandler("Please Provide Full Job Details",400)
            )
    }
    if((!salaryFrom||!salaryTo) && !fixedSalary){
            return next(
                ErrorHandler("Please either provide fixed Salary or ranged salary")
            )
    }
    if(salaryFrom && salaryTo && fixedSalary){
            return next(
                new ErrorHandler("Connt enter fixed and ranged Salary Together!")
            )
    }
    
    const job=await JobModel.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy:_id
    })
    res.json({
        success:true,
        message:"Job Posted Successfully!",
        job
    })
})

export const getMyJobs=catchAsyncError(async(req,res,next)=>{
    const {role,_id}=req.user;
    if(role==="Job Seeke"){
        return next(
            new ErrorHandler("Job Seeke is Not Allowed access to resource",400)
        )
    }
    const myJobs=await JobModel.find({
        postedBy:req.user._id
    });
    res.status(200).json({
        success:true,
        myJobs,
    })
});
export const updateJob=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;

    const {role}=req.user;
    if(role==="Job Seeke"){
        return next(
            new ErrorHandler("Job Seeke is Not Allowed access to resource",400)
        )
    }
    const myJob=await JobModel.findById(id);

    if(!myJob){
        return next(
            new ErrorHandler("Oops job Not found!",400))
}

    const job=await JobModel.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    })

    res.status(200).json({
        success:true,
        message:"Job Updated Succesfuly",
        job,
    })
});
export const DeleteJob=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;

    const {role}=req.user;
    if(role==="Job Seeke"){
        return next(
            new ErrorHandler("Job Seeke is Not Allowed access to resource",400)
        )
    }
    const myJob=await JobModel.findById(id);

    if(!myJob){
        return next(
            new ErrorHandler("Oops job Not found!",400))
}

    await myJob.deleteOne();

    res.status(200).json({
        success:true,
        message:"Job Deleted Succesfuly",
    })
});