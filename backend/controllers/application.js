import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { ApplicationModel } from "../models/application.js";
import cloudinary from "cloudinary";
import { JobModel } from "../models/job.js";

export const employerGetALLApplication=catchAsyncError(async(req,res,next)=>{

    const {role,_id}=req.user;
    if(role==="Job Seeke"){
        return next(
            new ErrorHandler("Job Seeke is Not Allowed access to resource",400)
        )
    }
    const applications=await ApplicationModel.find({
        "employerID.user":_id
    });

    if(!applications){
        return next(
            new ErrorHandler("Oops job Not found!",400))
}

    res.status(200).json({
        success:true,
        message:"Job Deleted Succesfuly",
        applications
    })
});

export const jobSeekerGetALLApplication=catchAsyncError(async(req,res,next)=>{

    const {role,_id}=req.user;
    if(role==="Employer"){
        return next(
            new ErrorHandler("Employer is Not Allowed access to resource",400)
        )
    }
    const applications=await ApplicationModel.find({
        "applicationId.user":_id
    });

    if(!applications){
        return next(
            new ErrorHandler("Oops job Not found!",400))
}

    res.status(200).json({
        success:true,
        message:"Job Deleted Succesfuly",
        applications
    })
});

export const JobSeekerDeleteApplication=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;

    const {role}=req.user;
    if(role==="Employer"){
        return next(
            new ErrorHandler("Employer is Not Allowed access to resource",400)
        )
    }
    const applications=await ApplicationModel.findById(id);

    if(!applications){
        return next(
            new ErrorHandler("Oops applications Not found!",400))
}

    await applications.deleteOne();

    res.status(200).json({
        success:true,
        message:"Applications Deleted Succesfuly",
    })
});
export const postedApplication=catchAsyncError(async(req,res,next)=>{

    const {role}=req.user;
    if(role==="Employer"){
        return next(
            new ErrorHandler("Employer is Not Allowed access to resource",400)
        )
    }

    if(!req.files || Object.keys(req.files).length===0){
        return next(
            new ErrorHandler("resume File Required",400))
}
    const {resume}=req.files;
    const allowedFormats=["image/png","image/jpg","image/webg","image/jpeg"];

    if(!allowedFormats.includes(resume.mimetype)){
        return next(
            new ErrorHandler("Invalid File Type ,Please Upload Your Resume in a PNG JPG WEBG and JPEG",400)
        )
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(
        resume.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            return next(
                new ErrorHandler("Faild To Upload Resume.",400)
            )
        }
        const {name,email,phone,coverLetter,address,jobId}=req.body;
        
        const applicationId={
            user:req.user._id,
            role:"Job Seeker"
        }
        if(!jobId){
            return next(
                new ErrorHandler("Job Id Not Founded.",400)
            )
        }
        const jobDetails=await JobModel.findById(jobId);
        
        if (!jobDetails) {
            return next(
                new ErrorHandler("Job Not Founded.",400)
            )            
        }
        const employerID = {
            user: jobDetails.postedBy,
            role: "Employer",
          };

          console.log(
            name,
            email ,
            coverLetter ,
            phone ,
            address ,
            applicationId ,
            employerID ,
            resume,
        );
        if (
            !name ||
            !email ||
            !coverLetter ||
            !phone ||
            !address ||
            !applicationId ||
            !employerID ||
            !resume
            ) {
                return next(new ErrorHandler("Please fill all fields.", 400));
            }
            
            const application = await ApplicationModel.create({
                name,
                email,
                coverLetter,
                phone,
                address,
                applicationId,
                employerID,
                resume: {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url,
                },
            });
            res.status(200).json({
                success: true,
                message: "Application Submitted!",
                application,
                });
            });