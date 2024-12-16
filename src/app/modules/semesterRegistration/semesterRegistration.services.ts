import mongoose from "mongoose";
import QueryBuilder from "../../bulder/QueryBuilder";
import AppError from "../../errors/AppError";
import { semesterModel } from "../academicSemister/semester.model";
import { OfferedCourseModel } from "../offerCourse/OfferedCourse.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationModel } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester

    //check if there any register semester that is already upcoming or ongoing
    const isThereAnyUpcomingOrOngoing = await semesterRegistrationModel.findOne({
        $or: [
            { status: "ONGOING" }, { status: "UPCOMING" }]
    })

    if (isThereAnyUpcomingOrOngoing) {
        throw new Error(`there is already a semester ${isThereAnyUpcomingOrOngoing.status}`);

    }




    if (payload?.academicSemester) {
        const isAcademicSemesterIsExist = await semesterModel.findById(payload?.academicSemester)
        if (!isAcademicSemesterIsExist) {
            throw new Error("this semester is not available");

        }
    }
    if (academicSemester) {
        const isAcademicSemesterIsExist = await semesterRegistrationModel.findOne({ academicSemester })
        if (isAcademicSemesterIsExist) {
            throw new Error("this semester already exists");

        }
    }


    const result = await semesterRegistrationModel.create(payload)

    return result



}

const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {

    const semesterRegistrationQuery = new QueryBuilder(semesterRegistrationModel.find().populate("academicSemester"), query).filter().sort().paginate().fields();
    const result = await semesterRegistrationQuery.modelQuery
    return result
}


const getSingleSemesterRegistration = async (id: string) => {
    const result = await semesterRegistrationModel.findById(id).populate("academicSemester")
    return result

}

const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

    const isRequestedSemesterIsExists = await semesterRegistrationModel.findById(id)
    if (!isRequestedSemesterIsExists) {
        throw new Error("this semester not available");

    }

    if (isRequestedSemesterIsExists?.status === "ENDED") {
        throw new Error("this semesterRegistration is ENDED");

    }

    if (isRequestedSemesterIsExists?.status === "UPCOMING" && payload?.status === 'ENDED') {
        throw new Error("you can not directly update the status -->Ended");

    }
    if (isRequestedSemesterIsExists?.status === "ONGOING" && payload?.status === 'UPCOMING') {
        throw new Error("you can not directly update the status ongoing -->upcoming");

    }


    const result = await semesterRegistrationModel.findByIdAndUpdate(id, payload, { new: true })


    return result



}


const deleteSemesterRegistrationFromDB = async (id: string) => {
    /** 
    * Step1: Delete associated offered courses.
    * Step2: Delete semester registraton when the status is 
    'UPCOMING'.
    **/

    // checking if the semester registration is exist
    const isSemesterRegistrationExists = await semesterRegistrationModel.findById(id);

    if (!isSemesterRegistrationExists) {
        throw new AppError(
            404,
            'This registered semester is not found !',
        );
    }

    // checking if the status is still "UPCOMING"
    const semesterRegistrationStatus = isSemesterRegistrationExists.status;

    if (semesterRegistrationStatus !== 'UPCOMING') {
        throw new AppError(
            500,
            `You can not update as the registered semester is ${semesterRegistrationStatus}`,
        );
    }

    const session = await mongoose.startSession();

    //deleting associated offered courses

    try {
        session.startTransaction();

        const deletedOfferedCourse = await OfferedCourseModel.deleteMany(
            {
                semesterRegistration: id,
            },
            {
                session,
            },
        );

        if (!deletedOfferedCourse) {
            throw new AppError(
                500,
                'Failed to delete semester registration !',
            );
        }

        const deletedSemisterRegistration =
            await semesterRegistrationModel.findByIdAndDelete(id, {
                session,
                new: true,
            });

        if (!deletedSemisterRegistration) {
            throw new AppError(
                500,
                'Failed to delete semester registration !',
            );
        }

        await session.commitTransaction();
        await session.endSession();

        return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};






export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistration,
    updateSemesterRegistrationIntoDB,
     deleteSemesterRegistrationFromDB 

}