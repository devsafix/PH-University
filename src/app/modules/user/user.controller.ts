import { NextFunction, Request, Response } from "express";
import { serviceData } from "./user.services";


const createUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        // validation with joy

        const {password,students } = req.body;
        // data validation with zod
        // const zodParsedData= userValidationWithZod.parse(data)
        // send this data in service section
        const result = await serviceData.createUserInDB(password,students);

        // send this result in client
        res.status(200).json({
            success: true,
            message: 'student create successfully',
            finalData: result,
        });
    } catch (err) {
        next(err)
    }
};

export const userController={
    createUser
}
