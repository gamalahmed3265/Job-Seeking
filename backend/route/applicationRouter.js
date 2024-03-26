import express from "express"
import { employerGetALLApplication, JobSeekerDeleteApplication, jobSeekerGetALLApplication, postedApplication } from "../controllers/application.js";
import { isAuthorized } from "../middlewares/auth.js";

const router=express.Router();

router.get("/employerGetALLApplication/",isAuthorized,employerGetALLApplication);
router.get("/jobSeekerGetALLApplication/",isAuthorized,jobSeekerGetALLApplication);
router.delete("/JobSeekerDeleteApplication/:id",isAuthorized,JobSeekerDeleteApplication);
router.post("/postedApplication/",isAuthorized,postedApplication);

export default router;