import { NextFunction, Request, Response } from 'express';
import { serviceData } from './student.service';

// import studentSchemaWIthZod from './student.zod';


const getAllData = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await serviceData.getAllData();
    res.status(200).json({
      success: true,
      message: 'student create successfully',
      finalData: result,
    });
  } catch (error) {
    next(error)
  }
};

const getSingleData = async (req: Request, res: Response ,next:NextFunction) => {
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

const deleteStudent=async(req :Request,res:Response , next:NextFunction)=>{
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


const updateStudent=async(req:Request,res:Response,next:NextFunction)=>{
 try {
   const value = req.params.id;

   const result= await serviceData.updateStudentbyId(value)
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
