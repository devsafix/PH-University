import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import academicDepartmentValidation from './academicDepartment.validation'
import { academicDepartmentController } from './academicDepartment.controler'

const router = express.Router()
router.post("/create-academic-department", validateRequest(academicDepartmentValidation),academicDepartmentController.createAcademicDepartment)

router.get('/all-academic-department', academicDepartmentController.getAllAcademicDepartment)
router.get("/academic-faculty/:id", academicDepartmentController.getSingleAcademicDepartment)
router.put("/academic-faculty/:id",academicDepartmentController.updateAcademicDepartMent)



export const academicDepartmentRouter = router