import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./route/userRouter.js"
import applicationRouter from "./route/applicationRouter.js"
import jobRouter from "./route/jobRouter.js"
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";


const app =express()
config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/"
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/application",applicationRouter)
app.use("/api/v1/job",jobRouter)

dbConnection()

app.use(errorMiddleware)
export default app