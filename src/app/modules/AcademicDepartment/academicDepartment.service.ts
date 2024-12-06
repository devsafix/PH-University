import { AcademicDepartment } from "./academicDepartment.interface"
import { academicDepartmentModel } from "./academicDepartment.model"



const createAcademicDepartmentInDB = async (payload: AcademicDepartment) => {
    const result = await academicDepartmentModel.create(payload)
    return result
}


const getAllAcademicDepartMentInDB = async () => {
    //populate method help --->to give referencing data 
    const result = await academicDepartmentModel.find().populate('academicfaculty')
    return result
}


const updateAcademicDepartMent = async (id: string, payload: Partial<AcademicDepartment>) => {
    const result = await academicDepartmentModel.findOneAndUpdate({_id:id}, payload, { new: true })
    return result
}

const getSingleAcademicDepartment = async (id: string) => {
    const result = await academicDepartmentModel.findById(id).populate('academicfaculty')
    return result
}




export const academicDepartmentService = {
     createAcademicDepartmentInDB,
    getAllAcademicDepartMentInDB,
    updateAcademicDepartMent,
    getSingleAcademicDepartment
}