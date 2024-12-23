import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { changePassWordValidationSchema, forgetValidationSchema, logInValidationSchema, reFreshTokenValidationSchema, resetValidationSchema } from './authentication.validation'
import { authenticationController } from './authentication.controler'
import auth from '../../middleware/auth'
import { User_Role } from '../user/user.const'


const router = express.Router()

router.post("/login", validateRequest(logInValidationSchema),authenticationController.logInUser)
router.post("/refresh-token", validateRequest(reFreshTokenValidationSchema), authenticationController.refreshToken)
router.post("/change-password", auth(User_Role.admin,User_Role.faculty,User_Role.student),validateRequest(changePassWordValidationSchema), authenticationController.changePassword)


router.post("/forget-password",validateRequest(forgetValidationSchema),authenticationController.forgetPassword)
router.post("/reset-password",validateRequest(resetValidationSchema),authenticationController.resetPassword)







export const authenticationRouter = router