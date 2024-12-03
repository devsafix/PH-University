import { model, Schema } from "mongoose";
import { AcademicSemester } from "./semister.interface";

const semesterSchema = new Schema<AcademicSemester>(
    {
        name: {
            type: String,
            enum: {
                values: ["Autumn", "Summer", "Fall"],
                message: "{VALUE} is not valid",
            },
            required: true,
        },
        code: {
            type: String,
            enum: {
                values: ["01", "02", "03"],
                message: "{VALUE} is not valid",
            },
            required: true,
        },
        year: { type: String, required: true },
        startMonth: {
            type: String,
            enum: {
                values: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ],
                message: "{VALUE} is not valid",
            },
            required: true,
        },
        endMonth: {
            type: String,
            enum: {
                values: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ],
                message: "{VALUE} is not valid",
            },
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

semesterSchema.pre("save", async function(next){
   const isSemesterExists= await semesterModel.findOne({
    name:this.name,
    year:this.year
   })
   if(isSemesterExists){
    throw new Error("this semester already exist");
    
   }
   next()
})





// 3. Create a Model.
export const semesterModel = model<AcademicSemester>("Semester", semesterSchema);
