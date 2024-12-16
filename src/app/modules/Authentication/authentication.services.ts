
import config from "../../config";
import AppError from "../../errors/AppError";
import { userModel } from "../user/user.model";
import { TLoginUer } from "./authentication.interface";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'



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

const changePassword = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string }) => {
    // checking is user exist 
    const isUserExists = await userModel.findOne({ id: userData?.userId })
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
    const isPasswordMatch = await bcrypt.compare(payload?.oldPassword, (isUserExists?.password) as string)
    if (!isPasswordMatch) {
        throw new AppError(500, "Password is not valid give valid password");

    }

    //<----hash new password--->

    const hashNewPassword = await bcrypt.hash(payload?.newPassword, Number(config.salt_round))




    await userModel.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, { password: hashNewPassword, needsPasswordChange: false, passwordChangeAt :new Date()})

    return null

}


export const authenticationServices = {
    loginUser,
    changePassword
}

