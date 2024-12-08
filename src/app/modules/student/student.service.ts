/* eslint-disable @typescript-eslint/no-explicit-any */


import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { Student } from './student.interface';


const getAllData = async (query:Record<string,unknown>) => {

  let searchTerm= '';
  if (query?.searchTerm){
    searchTerm = query?.searchTerm as string
  }

  const queryObj={...query}

// searching by searchTerm data --------->

  const searchingQuery = StudentModel.find({
    $or: ["email", "name.firstName", "presentAdd"].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  })


  // filtering 

  const excludeFields = ["searchTerm", "sort","limit"]
  excludeFields.forEach(el=>delete queryObj[el])

  const filteringQuery = searchingQuery.find(queryObj).populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: "academicfaculty"
    }
  });

  let sort="-createdAt"
  if(query?.sort){
    sort = query.sort as string
  }

  const sorting = filteringQuery.sort(sort)

  let limit=1
  if(query?.limit){
    limit = query?.limit as number
  }

  const result = await sorting.limit(limit)
  return result;
};

const singleData = async (id: string) => {
  const result = await StudentModel.findOne({ id: id }).populate({
    path: 'academicDepartment',
    populate: {
      path: "academicfaculty"
    }
  });;
  return result;
};

const studentDelete=async(id:string)=>{
  const session = await mongoose.startSession()
  
  try {
    session.startTransaction()
    const deleteStudent = await StudentModel.findOneAndUpdate({ id }, { isDelete: true },{new:true,session})
    if(!deleteStudent){
      throw new AppError(404,"Failed to delete student");
      
    }
    const deleteUser = await userModel.findOneAndUpdate({ id }, { isDelete: true }, { new: true, session })
    if (!deleteUser) {
      throw new AppError(404, "Failed to delete user");

    }
    await session.commitTransaction()
    await session.endSession()
    return deleteStudent
  } catch (error:any) {
    console.log(error)
    await session.abortTransaction();
    await session.endSession()
    throw new Error("Fail to delete  student");
    
  }



  
  
}

const updateStudentById=async(id:string,payload:Partial<Student>)=>{

  const {name,guardian,localGuardian,...remainingStudentData}=payload

  const modifiedData : Record<string,unknown> ={...remainingStudentData}

  if(name&& Object.keys(name).length){
    for(const [key,values] of Object.entries(name)){
      modifiedData[`name.${key}`]=values
    }
  }
  if (guardian && Object.keys(guardian).length){
    for (const [key, values] of Object.entries(guardian)){
      modifiedData[`guardian.${key}`]=values
    }
  }
  if (localGuardian && Object.keys(localGuardian).length){
    for (const [key, values] of Object.entries(localGuardian)){
      modifiedData[`localGuardian.${key}`]=values
    }
  }




  const result = await StudentModel.findOneAndUpdate({ id },modifiedData,{new:true,runValidators:true})
  return result
}

export const serviceData = {
  
  getAllData,
  singleData,
  studentDelete,
  updateStudentById
};
