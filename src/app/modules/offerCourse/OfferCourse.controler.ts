import catchAsync from "../../utils/catchAsync";
import { offerCourseService } from "./OfferCourse.services";

const createOfferCourse=catchAsync(async(req,res)=>{
    const result = await offerCourseService.createOfferCourseIntoDB(req.body)

    res.status(200).json({
        success:true,
        message:"offerCourse Created successfully",
        data:result
    })
})

const updateOfferedCourse=catchAsync(async(req,res)=>{
    const result = await offerCourseService.updateOfferCourse(req.params.id,req?.body)
        res.status(200).json({
            success: true,
            message: "offerCourse updated successfully",
            data: result
        })
})


export const offerCourseController={
    createOfferCourse,
    updateOfferedCourse
}