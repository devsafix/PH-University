import { semesterModel } from "./semester.model";
import { AcademicSemester } from "./semister.interface";

const createSemesterInDB = async (payload: AcademicSemester) => {
    const result= await semesterModel.create(payload)
    return result

}




export const semesterServices={
    createSemesterInDB
}