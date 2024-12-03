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

 const getAllSemester=catchAsync(async(req:Request,res:Response)=>{
   const result = await semesterServices.getAllSemesterFromDB()
    res.status(200).json({
       success: true,
       message: "semester comes successfully",
       data: result
    })
 })


 const singleSemesterById=catchAsync(async(req:Request,res:Response)=>{
   const id=req.params.id
   const result= await semesterServices.getSingleSemesterFormDB(id)
    res.status(200).json({
       success: true,
       message: "single successfully",
       data: result
    })
 })
 const updateSemesterById=catchAsync(async(req:Request,res:Response)=>{
   const id=req.params.id
   const value=req.body
   const result= await semesterServices.updateSemesterFormDB(id,value)
    res.status(200).json({
       success: true,
       message: "single successfully",
       data: result
    })
 })




 export const semesterController={
    createSemester,
    getAllSemester,
    singleSemesterById,
    updateSemesterById
 }