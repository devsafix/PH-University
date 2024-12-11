

import mongoose from "mongoose"
import QueryBuilder from "../../bulder/QueryBuilder"
import { TCourse, TCourseFaculty } from "./course.interface"
import { CourseFacultyModel, CourseModel } from "./course.model"
import AppError from "../../errors/AppError"

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await CourseModel.create(payload)
    return result
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(CourseModel.find().populate("preRequisiteCourse.course"), query).search(["title", "prefix"]).filter().sort().paginate().fields();
    const result = await courseQuery.modelQuery
    return result
}

const getSingleCourseFromDB = async (id: string) => {
    const result = await CourseModel.findById(id).populate("preRequisiteCourse.course")
    return result
}

const deleteCourseFromDB = async (id: string) => {
    const result = await CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    return result
}

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourse, ...reamingCourseData } = payload;

    //step-1 basic course update
    const session = await mongoose.startSession()
    try {
        session.startTransaction()


        const updateBasicData = await CourseModel.findByIdAndUpdate(id, reamingCourseData, { new: true, runValidators: true, session })
        if (!updateBasicData) {
            throw new AppError(500, "Failed to update course");

        }

        if (preRequisiteCourse && preRequisiteCourse.length > 0) {
            const deletedPreRequisites = preRequisiteCourse.filter((el) => el.course && el.isDeleted).map((el) => el.course)

            const deletedPreRequisitesCourse = await CourseModel.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourse: { course: { $in: deletedPreRequisites } } }
            }, { new: true, runValidators: true, session })
            if (!deletedPreRequisitesCourse) {
                throw new AppError(500, "Failed to delete preRequisite course");

            }

            const addNewPreRequisite = preRequisiteCourse?.filter((el) => el.course && !el.isDeleted)

            const addThisCourse = await CourseModel.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourse: { $each: addNewPreRequisite } }
            }, { new: true, runValidators: true, session })

            if (!addThisCourse) {
                throw new AppError(500, "Failed to add preRequisite course");

            }
        }

        const result = await CourseModel.findById(id).populate("preRequisiteCourse.course")

        await session.commitTransaction()
        await session.endSession()
        return result

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error(error);

    }


}

const assignFacultiesIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = await CourseFacultyModel.findByIdAndUpdate(id, { course: id, $addToSet: { faculties: { $each: payload } } }, { $upsert: true, new: true })

    return result
}
const removeFacultiesIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = await CourseFacultyModel.findByIdAndUpdate(id,
        { $pull: { faculties: { $in: payload } } },


        {new: true })

    return result
}






export const courseService = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDb,
    assignFacultiesIntoDB,
    removeFacultiesIntoDB
}