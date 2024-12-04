import { AcademicFaculty } from "./academicFaculty.interface";
import { academicFacultyModel } from "./academicFaculty.model";


const createAcademicFacultyInDB = async (payload: AcademicFaculty) => {
    const result = await academicFacultyModel.create(payload)
    return result
}


const getAllAcademicFacultyInDB = async () => {
    const result = await academicFacultyModel.find()
    return result
}


const updateAcademicFaculty = async (id: string, payload: Partial<AcademicFaculty>) => {
    const result = await academicFacultyModel.findByIdAndUpdate(id, payload, { new: true })
    return result
}

const getSingleAcademicFaculty=async(id:string)=>{
    const result=await academicFacultyModel.findById(id)
    return result
}




export const academicFacultyService = {
    createAcademicFacultyInDB,
    getAllAcademicFacultyInDB,
    updateAcademicFaculty,
    getSingleAcademicFaculty
}