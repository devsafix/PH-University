import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { semesterServices } from "./semester.services";

 const createSemester=catchAsync(async(req:Request,res:Response)=>{

    const result= await semesterServices.createSemesterInDB(req.body)


    res.status(200).json({
        success:true,
        message:"semester created successfully",
        data:result
    })

 })




 export const semesterController={
    createSemester
 }