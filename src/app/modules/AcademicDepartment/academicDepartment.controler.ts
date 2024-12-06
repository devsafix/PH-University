import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { academicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req: Request, res: Response) => {
    const result = await academicDepartmentService.createAcademicDepartmentInDB(req.body)
    res.status(200).json({
        success: true,
        message: "academic department create successfully",
        data: result

    })
})


const getAllAcademicDepartment = catchAsync(async (req: Request, res: Response) => {
    const result = await academicDepartmentService.getAllAcademicDepartMentInDB()
    res.status(200).json({
        success: true,
        message: "all academic department data coming successfully ",
        data: result

    })
})


const getSingleAcademicDepartment = catchAsync(async (req: Request, res: Response) => {
    const result = await academicDepartmentService.getSingleAcademicDepartment(req.params.id)
    res.status(200).json({
        success: true,
        message: " academic department data coming successfully ",
        data: result

    })
})
const updateAcademicDepartMent = catchAsync(async (req: Request, res: Response) => {
    const result = await academicDepartmentService.updateAcademicDepartMent(req.params.id, req.body)
    res.status(200).json({
        success: true,
        message: " academic department updated successfully ",
        data: result

    })
})



export const academicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateAcademicDepartMent
}