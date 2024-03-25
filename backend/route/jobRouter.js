import express from "express"
import { getAllJobs, postJob } from "../controllers/job.js";
import { isAuthorized } from "../middlewares/auth.js";

const router=express.Router();

router.get("/getAll",getAllJobs)
router.post("/postJob",isAuthorized,postJob)

export default router;