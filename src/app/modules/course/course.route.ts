import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import courseValidationSchema, { courseFacultyValidation, updateCourseValidationSchema } from './couser.validation'
import { courseController } from './course.controler'


const router = express.Router()
router.post("/create-course", validateRequest(courseValidationSchema), courseController.createCourse)

router.get('/all-course', courseController.getAllCourses)
router.get("/academic-course/:id", courseController.getSingleCourse)
router.delete("/academic-course/:id", courseController.getDeleteCourse)

router.patch("/academic-course/:id",validateRequest(updateCourseValidationSchema),courseController.updateCourse)

router.put("/academic-course/:courseId/assignFaculties",validateRequest(courseFacultyValidation), courseController.assignFaculties)

router.delete("/academic-course/:courseId/removeFaculties", validateRequest(courseFacultyValidation), courseController.removeFaculties)



export const courseRouter = router