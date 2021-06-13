import { Router, Request, Response } from "express";

const userRouter = Router()
userRouter.get('/prueba', (req:Request, res:Response)=>{
    res.json({
        estado: "success", 
        message: "ok"
    })
})
export default userRouter