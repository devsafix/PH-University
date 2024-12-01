
import { StudentModel } from './student.model';


const getAllData = async () => {
  const result = await StudentModel.find();
  return result;
};

const singleData = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

const studentDelete=async(id:string)=>{
  const result = await StudentModel.updateOne({id},{isDelete:true})
  return result
}

const updateStudentbyId=async(id:string)=>{
  const result = await StudentModel.updateOne({ id }, { contactNumber : "01633052196"})
  return result
}

export const serviceData = {
  
  getAllData,
  singleData,
  studentDelete,
  updateStudentbyId
};
