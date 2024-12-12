

import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { status } from "./semesterRegistration.constant";


const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: { type: Schema.Types.ObjectId, ref: "Semester", unique: true, required: true },
    status:{type:String,enum:[...status],default:"UPCOMING"},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    maxCredit:{type:Number,required:true,default:15},
    minCredit: { type: Number, required: true,default:3 },



},{
    timestamps:true
})


export const semesterRegistrationModel = model<TSemesterRegistration>("semesterRegistration", semesterRegistrationSchema)