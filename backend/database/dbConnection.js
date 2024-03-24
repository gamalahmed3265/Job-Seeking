import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGOOSE_URL,{
        dbName: process.env.MONGOOSE_NAME_DATABASE
    }).then(()=>{
        console.log("Connected to Database!");
    }).catch((e)=>{
        console.log(`Some Error Occured while Connected To Database ${e}`);
    })
}

