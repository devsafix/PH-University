import config from "../../config";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import {  TUser } from "./user.interface";
import { userModel } from "./user.model";

const createUserInDB = async (password:string,data: Student) => {

    // if (await userModel.isExists(data.id)) {
    //     throw new Error("already availavl");


    // }

    const user : Partial<TUser> = {} 

    user.password = password || config.default_pass as string
   


// default role
    user.role="student"
// default id
    user.id="2030100001"


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
