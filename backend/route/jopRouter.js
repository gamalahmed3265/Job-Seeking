import express from "express"

const router=express.Router();

router.get("/",(req,res)=>{
    console.log(req);

    res.send(req.headers)
})

export default router;