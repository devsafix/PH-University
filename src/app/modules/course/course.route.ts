import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import courseValidationSchema, { updateCourseValidationSchema } from './couser.validation'
import { courseController } from './course.controler'


const router = express.Router()
router.post("/create-course", validateRequest(courseValidationSchema), courseController.createCourse)

router.get('/all-course', courseController.getAllCourses)
router.get("/academic-course/:id", courseController.getSingleCourse)
router.delete("/academic-course/:id", courseController.getDeleteCourse)

router.patch("/academic-course/:id",validateRequest(updateCourseValidationSchema),courseController.updateCourse)



export const courseRouter = router