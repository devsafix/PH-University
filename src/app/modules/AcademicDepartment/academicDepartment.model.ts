
import AppError from '../../errors/AppError';
import { AcademicDepartment } from './academicDepartment.interface';
import mongoose, { model, Schema } from "mongoose";

const academicDepartmentSchema=new Schema<AcademicDepartment>({
    name:{type:String,required:true,unique:true},
    academicfaculty: { type: mongoose.Schema.Types.ObjectId, ref:"AcademicFaculty",required:true}
},{timestamps:true})


academicDepartmentSchema.pre("save",async function(next){
    const isDepartmentExists= await academicDepartmentModel.findOne({name:this?.name})
    if(isDepartmentExists){
        throw new AppError(400,"this department already exits");
        
    }
    next()
})









academicDepartmentSchema.pre("findOneAndUpdate",async function(next){
  const query =this.getQuery()
    const isDepartmentExists = await academicDepartmentModel.findOne(query)
    if (!isDepartmentExists) {
        throw new AppError(404,"this department does not exits");

    }
    next()
})


export const academicDepartmentModel=model<AcademicDepartment>("academicDepartment",academicDepartmentSchema)