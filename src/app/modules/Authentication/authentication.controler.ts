import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import { authenticationServices } from "./authentication.services";

const logInUser = catchAsync(async (req, res) => {
    const result = await authenticationServices.loginUser(req?.body)
    const { reFreshToken, accessToken, needsPasswordChange } = result

    // <-  now save the token in the cookie ->

    res.cookie("refreshToken", reFreshToken, {
        secure: config.node_env === "production",
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "User id logged in successfully",
        data: {
            accessToken, needsPasswordChange
        }
    })
})
const changePassword = catchAsync(async (req, res) => {
    const result = await authenticationServices.changePassword(req.user, req?.body)
    res.status(200).json({
        success: true,
        message: "password change  successfully",
        data: result
    })
})


const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken }=req.cookies
    const result = await authenticationServices.reFreshToken(refreshToken)




    res.status(200).json({
        success: true,
        message: "User id logged in successfully",
        data: result
    })

})


const forgetPassword=catchAsync(async(req,res)=>{
    const result= await authenticationServices.forgetPassword(req.body.id)

    res.status(200).json({
        success: true,
        message: "Reset link generated successfully",
        data: result
    })

})
const resetPassword=catchAsync(async(req,res)=>{
    const token=req.headers.authorization as string
    const result= await authenticationServices.resetPassword(req.body,token)

    res.status(200).json({
        success: true,
        message: " password Reset  successfully",
        data: result
    })

})







export const authenticationController = {
    logInUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}