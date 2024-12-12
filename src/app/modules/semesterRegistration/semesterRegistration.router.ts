import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { semesterRegistrationValidation, updateSemesterRegistrationValidation } from './semesterRegistration.validation'
import { semesterRegistrationController } from './semesterRegistration.controller'

const router=express.Router()


router.post("/create-semester-registration",validateRequest(semesterRegistrationValidation),semesterRegistrationController.createSemesterRegistration)


router.get("/all-semester-registration",semesterRegistrationController.getAllSemesterRegistration)
router.get("/single-semester-registration/:id",semesterRegistrationController.getSingleSemesterRegistration)
router.patch("/update-semester-registration/:id",validateRequest(updateSemesterRegistrationValidation),semesterRegistrationController.updateSemesterRegistration)



export const semesterRegistrationRouter=router