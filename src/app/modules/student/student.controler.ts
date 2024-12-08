import {  RequestHandler} from 'express';
import { serviceData } from './student.service';

// import studentSchemaWIthZod from './student.zod';


const getAllData:RequestHandler = async (req, res,next) => {
  try {
    const result = await serviceData.getAllData(req.query);
    res.status(200).json({
      success: true,
      message: 'all data is here',
      finalData: result,
    });
  } catch (error) {
    next(error)
  }
};

const getSingleData : RequestHandler = async (req, res ,next) => {
  try {
    const id = req.params.id;
    const result = await serviceData.singleData(id);
    res.status(200).json({
      success: true,
      message: 'student create successfully',
      finalData: result,
    });
  } catch (error) {
    next(error)
  }
};

const deleteStudent: RequestHandler =async(req ,res , next)=>{
  try {
    const value = req.params.id;

    const result= await serviceData.studentDelete(value)

    res.status(200).json({
      success:true,
      message:"delete success",
      data:result
    })




  
  } catch (err) {
 next(err)
  }

}


const updateStudent:RequestHandler =async(req,res,next)=>{
 try {
   const value = req.params.id;

   const result= await serviceData.updateStudentById(value,req.body?.students)
   res.status(200).json({
     success: true,
     message: "updated",
     data: result
   })

 
 } catch (err) {
   next(err)
  
 }

}




export const studentController = {

  getAllData,
  getSingleData,
  deleteStudent,
  updateStudent
};
