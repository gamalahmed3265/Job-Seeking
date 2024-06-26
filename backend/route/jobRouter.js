import express from "express"
import { DeleteJob, getAllJobs, getMyJobs, getSingleJob, postJob, updateJob } from "../controllers/job.js";
import { isAuthorized } from "../middlewares/auth.js";

const router=express.Router();

router.get("/getAll",getAllJobs)
router.post("/postJob",isAuthorized,postJob)
router.get("/getMyJobs",isAuthorized,getMyJobs)
router.get("/:id",isAuthorized,getSingleJob)
router.put("/updateJob/:id",isAuthorized,updateJob)
router.delete("/deleteJob/:id",isAuthorized,DeleteJob)

export default router;