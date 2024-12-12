import catchAsync from "../../utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.services";

const createSemesterRegistration=catchAsync(async(req,res)=>{
    const result= await semesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)
    res.status(200).json({
        success:true,
        message:"semester registration created successfully",
        data:result
    })
})

const getAllSemesterRegistration=catchAsync(async(req,res)=>{
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)
    res.status(200).json({
        success: true,
        message: "semester registration retrieved successfully",
        data: result
    })
})

const getSingleSemesterRegistration=catchAsync(async(req,res)=>{
    const result= await semesterRegistrationServices.getSingleSemesterRegistration(req.params.id)
    res.status(200).json({
        success: true,
        message: "semester registration retrieved successfully",
        data: result
    })
})


const updateSemesterRegistration=catchAsync(async(req,res)=>{
    const result= await semesterRegistrationServices.updateSemesterRegistrationIntoDB(req.params.id,req?.body)
        res.status(200).json({
            success: true,
            message: "semester registration updated successfully",
            data: result
        })
})





export const semesterRegistrationController={
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}