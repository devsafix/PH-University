import config from "../../config";
import { semesterModel } from "../academicSemister/semester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import {  TUser } from "./user.interface";
import { userModel } from "./user.model";
import { generateId } from "./user.utilis";

const createUserInDB = async (password:string,data: Student) => {

    // if (await userModel.isExists(data.id)) {
    //     throw new Error("already availavl");


    // }

    const user : Partial<TUser> = {} 

    user.password = password || config.default_pass as string
   


// default role
    user.role="student"


    // find semester find by id
    const admissionSemester= await semesterModel.findById(data.admissionSemester)






// default id
if(admissionSemester){
    user.id= await generateId(admissionSemester)}
    else{
        throw new Error("bro semester no exits");
        
    }


// create a user
    const result = await userModel.create(user); 

// created a student
    if(Object.keys(result).length){
        // set id ,_id
        data.id=result.id;
        data.user=result._id

        const newStudent= await StudentModel.create(data)
        return newStudent;
    }

   
};

export const serviceData={
    createUserInDB
}
