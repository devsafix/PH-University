import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import academicFacultyValidation from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controler'

const router = express.Router()
router.post("/create-academic-faculty", validateRequest(academicFacultyValidation), academicFacultyController.createAcademicFaculty)

router.get('/all-academic-faculty', academicFacultyController.getAllAcademicFaculty)
router.get("/academic-faculty/:id", academicFacultyController.getSingleAcademicFaculty)
router.put("/academic-faculty/:id", academicFacultyController.updateAcademicFaculty)



export const academicFacultyRouter = router