import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { logInValidationSchema } from './authentication.validation'
import { authenticationController } from './authentication.controler'


const router = express.Router()

router.post("/login", validateRequest(logInValidationSchema),authenticationController.logInUser)







export const authenticationRouter = router