import QueryBuilder from "../../bulder/QueryBuilder";
import { semesterModel } from "../academicSemister/semester.model";
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






export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistration,
    updateSemesterRegistrationIntoDB
}