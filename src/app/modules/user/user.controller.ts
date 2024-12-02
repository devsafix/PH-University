

import { serviceData } from "./user.services";
import catchAsync from "../../utils/catchAsync";

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

export const userController={
    createUser
}
