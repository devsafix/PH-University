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




export const authenticationController = {
    logInUser,
    changePassword,
    refreshToken
}