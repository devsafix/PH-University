import { NextFunction, Request, Response } from "express"
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"

// interface CustomRequest extends Request{
//     user:JwtPayload
// }

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // check it is pure token :------->
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError(401, "YOu are not authorized");

            }
            // <-----check if the token is valid ;---->

            jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
                // err
                if (err) {
                    throw new AppError(401, "YOu are not authorized");
                }
                // decoded undefined
                req.user=decoded as JwtPayload
                next()
            });




            
        } catch (error) {
            next(error)
        }
    }
}

export default auth