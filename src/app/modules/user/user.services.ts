import mongoose from "mongoose";
import config from "../../config";
import { semesterModel } from "../academicSemister/semester.model";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";
import { generateAdminId, generateFacultyId, generateId } from "./user.utilis";
import AppError from "../../errors/AppError";
import { Admin } from "../Admin/admin.model";
import { TFaculty } from "../Faculty/faculty.interface";
import { academicDepartmentModel } from "../AcademicDepartment/academicDepartment.model";
import { Faculty } from "../Faculty/faculty.model";

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


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.log(error)
        await session.abortTransaction()
        await session.endSession()
        throw new Error(error);
        
    }







};
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set student role
    userData.role = 'faculty';

    // find academic department info
    const academicDepartment = await academicDepartmentModel.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await userModel.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(500, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(500, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set student role
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await userModel.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(500, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(500, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const serviceData = {
    createUserInDB,
    createAdminIntoDB,
    createFacultyIntoDB
}
