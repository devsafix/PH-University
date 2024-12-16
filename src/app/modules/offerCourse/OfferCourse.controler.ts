import catchAsync from "../../utils/catchAsync";
import { offerCourseService } from "./OfferCourse.services";

const createOfferCourse = catchAsync(async (req, res) => {
    const result = await offerCourseService.createOfferCourseIntoDB(req.body);

    res.status(200).json({
        success: true,
        message: "OfferCourse created successfully",
        data: result,
    });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
    const result = await offerCourseService.updateOfferCourse(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: "OfferCourse updated successfully",
        data: result,
    });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
    const result = await offerCourseService.getAllOfferedCoursesFromDB(req.query);

    res.status(200).json({
        success: true,
        message: "All offered courses retrieved successfully",
        data: result,
    });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await offerCourseService.getSingleOfferedCourseFromDB(id);

    res.status(200).json({
        success: true,
        message: "Single offered course retrieved successfully",
        data: result,
    });
});

const deleteOfferedCourseFromDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await offerCourseService.deleteOfferedCourseFromDB(id);

    res.status(200).json({
        success: true,
        message: "Offered course deleted successfully",
        data: result,
    });
});

export const offerCourseController = {
    createOfferCourse,
    updateOfferedCourse,
    getSingleOfferedCourse,
    getAllOfferedCourses,
    deleteOfferedCourseFromDB,
};
