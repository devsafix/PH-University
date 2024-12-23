

import { serviceData } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

// catch async

// const catchAsync = (fn: RequestHandler)=>{
//     return (req:Request,res:Response,next:NextFunction)=>{
//     Promise.resolve(fn(req,res,next)).catch((err)=>next(err))

//     }
// }












const createUser = catchAsync(async (req, res) => {

    // validation with joy


    const { password, students } = req.body;
    // data validation with zod
    // const zodParsedData= userValidationWithZod.parse(data)
    // send this data in service section
    const result = await serviceData.createUserInDB(password, students);

    // send this result in client
    res.status(200).json({
        success: true,
        message: 'student create successfully',
        finalData: result,
    });

})
const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;

    const result = await serviceData.createFacultyIntoDB(password, facultyData);

    res.status(400).json({
        success: true,
        message: 'Faculty is created succesfully',
        data: result,
    })
});

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await serviceData.createAdminIntoDB(password, adminData);

    res.status(200).json({
        success: true,
        message: 'Admin is created successfully',
        data: result,
    })
});
const getMe = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError(404, "Access TOken not Found");

    }

    const result = await serviceData.getMeFromDB(token);

    res.status(200).json({
        success: true,
        message: 'data coming successfully',
        data: result,
    })
});
const changeStatus = catchAsync(async (req, res) => {
   
    const result = await serviceData.changeStatus(req.params.id,req.body);

    res.status(200).json({
        success: true,
        message: 'status updated successfully',
        data: result,
    })
});


export const userController = {
    createUser,
    createFaculty,
    createAdmin,
    getMe,
    changeStatus
}
