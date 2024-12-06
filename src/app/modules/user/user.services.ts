import mongoose from "mongoose";
import config from "../../config";
import { semesterModel } from "../academicSemister/semester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";
import { generateId } from "./user.utilis";
import AppError from "../../errors/AppError";

const createUserInDB = async (password: string, data: Student) => {

    // if (await userModel.isExists(data.id)) {
    //     throw new Error("already availavl");


    // }

    const user: Partial<TUser> = {}

    user.password = password || config.default_pass as string



    // default role
    user.role = "student"


    // find semester find by id
    const admissionSemester = await semesterModel.findById(data.admissionSemester)
    // transition and rollback

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        // default id
        if (admissionSemester) {
            user.id = await generateId(admissionSemester)
        }
        else {
            throw new Error("bro semester no exits");

        }


        // create a user
        const result = await userModel.create([user], { session });// array hisabe

        // created a student
        if (!result.length) {
            throw new AppError(404, "Failed to create user");

        }
        // set id ,_id
        data.id = result[0].id;
        data.user = result[0]._id

        const newStudent = await StudentModel.create([data], { session })
        if (!newStudent.length) {
            throw new AppError(404, "Failed to create student");

        }
        await session.commitTransaction()
        await session.endSession()
        return newStudent;


    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        await session.endSession()
        throw new Error("failed to create user");
        
    }







};

export const serviceData = {
    createUserInDB
}
