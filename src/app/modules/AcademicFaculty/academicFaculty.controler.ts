import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty=catchAsync(async(req:Request,res:Response)=>{
    const result= await academicFacultyService.createAcademicFacultyInDB(req.body)
    res.status(200).json({
        success:true,
        message:"academic faculty create successfully",
        data:result

    })
})


const getAllAcademicFaculty=catchAsync(async(req:Request,res:Response)=>{
    const result= await academicFacultyService.getAllAcademicFacultyInDB()
    res.status(200).json({
        success: true,
        message: "all academic faculty data coming successfully ",
        data: result

    })
})


const getSingleAcademicFaculty=catchAsync(async(req:Request,res:Response)=>{
    const result= await academicFacultyService.getSingleAcademicFaculty(req.params.id)
    res.status(200).json({
        success: true,
        message: " academic faculty data coming successfully ",
        data: result

    })
})
const updateAcademicFaculty=catchAsync(async(req:Request,res:Response)=>{
    const result= await academicFacultyService.updateAcademicFaculty(req.params.id,req.body)
    res.status(200).json({
        success: true,
        message: " academic faculty updated successfully ",
        data: result

    })
})



export const academicFacultyController={
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}