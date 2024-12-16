
import config from "../../config";
import AppError from "../../errors/AppError";
import { userModel } from "../user/user.model";
import { TLoginUer } from "./authentication.interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginUser = async (payload: TLoginUer) => {
    // checking is user exist 
    const isUserExists = await userModel.findOne({ id: payload?.id })
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

    // check if the password is ok
    const isPasswordMatch = await bcrypt.compare(payload?.password, (isUserExists?.password) as string)
    if (!isPasswordMatch) {
        throw new AppError(500, "Password is not valid give valid password");

    }

    // access Granted : send Access token and Refresh token ...
    const jwtPayload = {
        userId: isUserExists?.id,
        role: isUserExists?.role
    }

    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: "10d" });


    return {
        accessToken: token,
        needsPasswordChange: isUserExists?.needsPasswordChange
    }






}


export const authenticationServices = {
    loginUser
}

