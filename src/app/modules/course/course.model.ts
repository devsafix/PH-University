import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourse } from "./course.interface";


const preRequisiteCourseSchema=new Schema<TPreRequisiteCourse>({
    course:{type:Schema.Types.ObjectId, ref:"course"},
    isDeleted:{type:Boolean,default:false}
})

const courseSchema=new Schema<TCourse>({
    title:{type:String,unique:true,trim:true,required:true},
    prefix:{type:String,trim:true,required:true},
    code:{type:Number,required:true},
    credits:{type:Number,required:true},
    isDeleted: { type: Boolean, default: false },
    preRequisiteCourse:[preRequisiteCourseSchema]

})


export const CourseModel =model<TCourse>("course",courseSchema)

const courseFacultySchema= new Schema<TCourseFaculty>({
    course:{type:Schema.Types.ObjectId, ref:"course",unique:true},
    faculties: [{ type: Schema.Types.ObjectId, ref:"Faculty"}]

})

export const CourseFacultyModel = model<TCourseFaculty>("courseFaculty", courseFacultySchema)
