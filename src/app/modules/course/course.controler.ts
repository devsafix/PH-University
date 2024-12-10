import catchAsync from "../../utils/catchAsync";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await courseService.createCourseIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: "course created successfully",
        data: result
    })
})

const getAllCourses = catchAsync(async (req, res) => {
    const result = await courseService.getAllCoursesFromDB(req.query)
    res.status(200).json({
        success: true,
        message: "course coming successfully",
        data: result
    })
})
const getSingleCourse = catchAsync(async (req, res) => {
    const result = await courseService.getSingleCourseFromDB(req.params.id)
    res.status(200).json({
        success: true,
        message: "course coming successfully",
        data: result
    })
})
const getDeleteCourse = catchAsync(async (req, res) => {
    const result = await courseService.deleteCourseFromDB(req.params.id)
    res.status(200).json({
        success: true,
        message: "course deleted successfully",
        data: result
    })
})

const updateCourse=catchAsync(async(req,res)=>{
    const result= await courseService.updateCourseIntoDb(req.params.id,req.body)
    res.status(200).json({
        success: true,
        message: "course update successfully",
        data: result
    })
})






export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    getDeleteCourse,
    updateCourse
}