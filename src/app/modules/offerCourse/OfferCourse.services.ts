import QueryBuilder from "../../bulder/QueryBuilder";
import AppError from "../../errors/AppError";
import { academicDepartmentModel } from "../AcademicDepartment/academicDepartment.model";
import { academicFacultyModel } from "../AcademicFaculty/academicFaculty.model";
import { CourseModel } from "../course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { semesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offerCourse.interface";
import { OfferedCourseModel } from "./OfferedCourse.model";
import { hasTimeConflict } from "./OfferedCourse.utils";

const createOfferCourseIntoDB = async (payload: TOfferedCourse) => {

    const isSemesterRegistrationExists = await semesterRegistrationModel.findById(payload?.semesterRegistration)

    if (!isSemesterRegistrationExists) {
        throw new Error("invalid semesterRegistration id");

    }
    const academicSemester = isSemesterRegistrationExists.academicSemester

    const isAcademicFacultyExists = await academicFacultyModel.findById(payload?.academicFaculty)

    if (!isAcademicFacultyExists) {
        throw new Error("invalid AcademicFaculty id");

    }
    const isAcademicDepartmentExists = await academicDepartmentModel.findById(payload?.academicDepartment)

    if (!isAcademicDepartmentExists) {
        throw new Error("invalid AcademicDepartment id");

    }
    const isCourseExists = await CourseModel.findById(payload?.course)

    if (!isCourseExists) {
        throw new Error("invalid isCourseExists id");

    }
    const isFacultyExists = await Faculty.findById(payload?.faculty)

    if (!isFacultyExists) {
        throw new Error("invalid isFacultyExists id");

    }

    const isDepartmentBelongToFaculty = await academicDepartmentModel.findOne({
        _id: payload.academicDepartment,
        academicfaculty: payload.academicFaculty,
    });

    if (!isDepartmentBelongToFaculty) {
        throw new AppError(
            500, `This ${isAcademicDepartmentExists.name} is not  belong to this ${isFacultyExists.name}`,
        );
    }

    // check if the same offered course same section in same registered semester exists

    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
        await OfferedCourseModel.findOne({
            semesterRegistration: payload.semesterRegistration,
            course: payload.course,
            section: payload.section,
        });

    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new AppError(
            500,
            `Offered course with same section is already exist!`,
        );
    }

    // get the time of the faculty
    const assignedSchedules = await OfferedCourseModel.find({ semesterRegistration: payload.semesterRegistration, faculty: payload.faculty, days: { $in: payload.days } }).select("days startTime endTime")

    const newSchedules = {
        days: payload.days,
        startTime: payload.startTime,
        endTime: payload.endTime
    }

  if(hasTimeConflict(assignedSchedules,newSchedules)){
    throw new AppError(500,"this teacher is not available");
    
  }





    const result = await OfferedCourseModel.create({ ...payload, academicSemester })
    return result
}

const updateOfferCourse = async (id: string, payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>)=>{

    const isOfferCourseExits= await OfferedCourseModel.findById(id)
    if(!isOfferCourseExits){
        throw new AppError(404,"this offered course not found");
        
    }
    
  const semesterRegistrationStatus= await semesterRegistrationModel.findById(isOfferCourseExits?.semesterRegistration).select("status")

  if(semesterRegistrationStatus?.status !== "UPCOMING"){
      throw new AppError(500, `you can not update this offered course as it is${semesterRegistrationStatus?.status}`);
    
  }


    const isFacultyExits = await Faculty.findById(payload?.faculty)
    if (!isFacultyExits){
        throw new AppError(404,"this offered course not found");
        
    }


    const assignedSchedules = await OfferedCourseModel.find({ semesterRegistration: isOfferCourseExits?.semesterRegistration, faculty: payload.faculty, days: { $in: payload.days } }).select("days startTime endTime")

    const newSchedules = {
        days: payload.days,
        startTime: payload.startTime,
        endTime: payload.endTime
    }

    if (hasTimeConflict(assignedSchedules, newSchedules)) {
        throw new AppError(500, "this teacher is not available");

    }

    const result= await OfferedCourseModel.findByIdAndUpdate(id,payload,{new:true})

    return result





}

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
};
const getSingleOfferedCourseFromDB = async (id: string) => {
    const offeredCourse = await OfferedCourseModel.findById(id);

    if (!offeredCourse) {
        throw new AppError(404, 'Offered Course not found');
    }

    return offeredCourse;
};


const deleteOfferedCourseFromDB = async (id: string) => {
    /**
     * Step 1: check if the offered course exists
     * Step 2: check if the semester registration status is upcoming
     * Step 3: delete the offered course
     */
    const isOfferedCourseExists = await OfferedCourseModel.findById(id);

    if (!isOfferedCourseExists) {
        throw new AppError(404, 'Offered Course not found');
    }

    const semesterRegistation = isOfferedCourseExists.semesterRegistration;

    const semesterRegistrationStatus =
        await semesterRegistrationModel.findById(semesterRegistation).select('status');

    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
        throw new AppError(
            500,
            `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
        );
    }

    const result = await OfferedCourseModel.findByIdAndDelete(id);

    return result;
};



export const offerCourseService = {
    createOfferCourseIntoDB,
    updateOfferCourse,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    deleteOfferedCourseFromDB
}