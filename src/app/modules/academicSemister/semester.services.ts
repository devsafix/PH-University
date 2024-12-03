
import { semesterModel } from "./semester.model";
import { AcademicSemester } from "./semister.interface";

const createSemesterInDB = async (payload: AcademicSemester) => {

    // name === code check for semester save :____
    type NameWithCode = {
        [key: string]: string
    }
    const nameWithCode: NameWithCode = {
        Autumn: "01",
        Summer: "02",
        Fall: "03"

    }

    if (nameWithCode[payload.name] !== payload.code) {
        throw new Error("invalid semester  code ");

    }





    const result = await semesterModel.create(payload)
    return result

}


const getAllSemesterFromDB = async () => {
    const result = await semesterModel.find()
    return result
}

const getSingleSemesterFormDB = async (payload: string) => {
    const result = await semesterModel.findById(payload)
    return result
}
const updateSemesterFormDB = async (id: string, payload: Partial<AcademicSemester>) => {
    type NameWithCode = {
        [key: string]: string
    }
    const nameWithCode: NameWithCode = {
        Autumn: "01",
        Summer: "02",
        Fall: "03"

    }

    if (payload.name &&
        payload.code && nameWithCode[payload.name] !== payload.code) {
        throw new Error("invalid semester  code ");

    }


    const result = await semesterModel.findByIdAndUpdate(id, payload,{new:true})
    return result
}




export const semesterServices = {
    createSemesterInDB
    , getAllSemesterFromDB,
    getSingleSemesterFormDB,
    updateSemesterFormDB
}