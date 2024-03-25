import express from "express"
import { register,login,logout } from "../controllers/user.js";
import { isAuthorized } from "../middlewares/auth.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",isAuthorized,logout);

export default router;