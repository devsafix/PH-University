/* eslint-disable no-unused-vars */

import QueryBuilder from "../../bulder/QueryBuilder"
import { TCourse } from "./course.interface"
import { CourseModel } from "./course.model"

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updateBasicData = await CourseModel.findByIdAndUpdate(id, reamingCourseData, { new: true, runValidators: true })

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
        const deletedPreRequisites = preRequisiteCourse.filter((el) => el.course && el.isDeleted).map((el) => el.course)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const deletedPreRequisitesCourse = await CourseModel.findByIdAndUpdate(id, {
            $pull: { preRequisiteCourse: { course: { $in: deletedPreRequisites } } }
        })
        
        const addNewPreRequisite = preRequisiteCourse?.filter((el) => el.course && !el.isDeleted)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const addThisCourse = await CourseModel.findByIdAndUpdate(id, {
            $addToSet: { preRequisiteCourse: { $each: addNewPreRequisite } }
        })

    }

    const result = await CourseModel.findById(id).populate("preRequisiteCourse.course")

    


    return result



}



export const courseService = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDb
}