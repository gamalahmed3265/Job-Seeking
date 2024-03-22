import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_CLIENT_NAME,
    api_key: process.env.CLOUD_CLIENT_API,
    api_secret: process.env.CLOUD_CLIENT_SECRET,
})

let port=process.env.PORT||8000
app.listen(port,()=>{
    console.log(`server runing on ${port}`);
})