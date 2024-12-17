import { NextFunction, Request, Response } from "express"
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
import { TUserRole } from "../modules/user/user.const";
import catchAsync from "../utils/catchAsync";
import { userModel } from "../modules/user/user.model";

// interface CustomRequest extends Request{
//     user:JwtPayload
// }

const auth = (...roles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        // -<---check it is pure token :------->

        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(401, "YOu are not authorized");

        }

        // <----- check if the token is valid ;---->

        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload;

        const { role, userId, iat } = decoded;


        // checking is user exist 
        const isUserExists = await userModel.findOne({ id: userId })
        if (!isUserExists) {
            throw new AppError(404, "this user not exists");

        }
        // check if the user is already deleted
        const isUserDelete = isUserExists?.isDeleted
        if (isUserDelete) {
            throw new AppError(404, "this user is deleted");

        }
        const isUserBlocked = isUserExists?.status
        if (isUserBlocked === 'blocked') {
            throw new AppError(404, "this user is blocked");

        }
        const isUserChangePassword = isUserExists?.passwordChangeAt
        if (isUserChangePassword && iat && isUserChangePassword.getTime() > iat * 1000) {
            // Invalidate the token logic here
            throw new AppError(
                401,
                'You are not authorized  hi!',
            );
        }






        if (role && !roles.includes(role)) {
            throw new AppError(
                401,
                'You are not authorized  hi! please logIn again',
            );
        }

        req.user = decoded as JwtPayload;
        next();





    })
}

export default auth