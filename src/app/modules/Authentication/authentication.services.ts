
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendEmail } from "../../utils/sendEmail";
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
    // <--------create a access Token --------------->
    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: "10d" });
    // <--------create a Refresh Token --------------->
    const reFreshToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: "365d" });


    return {
        accessToken: token,
        needsPasswordChange: isUserExists?.needsPasswordChange,
        reFreshToken
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
    }, { password: hashNewPassword, needsPasswordChange: false, passwordChangeAt: new Date() })

    return null

}


const reFreshToken = async (token: string) => {
    // <----- check if the token is valid ;---->

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId, iat } = decoded;


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

    const jwtPayload = {
        userId: isUserExists?.id,
        role: isUserExists?.role
    }
    // <--------create a access Token --------------->
    const newToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: "10d" });


    return {
        accessToken: newToken
    }


}


const forgetPassword = async (id: string) => {
    const isUserExists = await userModel.findOne({ id: id })
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
    const jwtPayload = {
        userId: isUserExists?.id,
        role: isUserExists?.role
    }
    // <--------create a access Token --------------->
    const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: "10m" });
    const resetUILink = `${config.reset_pass_ui_Link}?id=${isUserExists.id}&token=${resetToken}`


    sendEmail(isUserExists.email, resetUILink)


}

const resetPassword=async(payload:{id:string,newPassword:string},token:string)=>{
    const isUserExists = await userModel.findOne({ id: payload.id })
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
        throw new AppError(403, "this user is blocked");

    }

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId,role} = decoded

    if (payload.id !== userId) {
        throw new AppError(403,"Unauthorized access");
    }


    const hashNewPassword = await bcrypt.hash(payload?.newPassword, Number(config.salt_round))

    await userModel.findOneAndUpdate({
        id: userId,
        role: role,
    }, { password: hashNewPassword, needsPasswordChange: false, passwordChangeAt: new Date() })

    return null


}





export const authenticationServices = {
    loginUser,
    changePassword,
    reFreshToken,
    forgetPassword,
    resetPassword
}

