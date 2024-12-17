import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import courseValidationSchema, { courseFacultyValidation, updateCourseValidationSchema } from './couser.validation'
import { courseController } from './course.controler'
import auth from '../../middleware/auth'
import { User_Role } from '../user/user.const'


const router = express.Router()
router.post("/create-course",auth(User_Role.admin), validateRequest(courseValidationSchema), courseController.createCourse)

router.get('/all-course', courseController.getAllCourses)
router.get("/academic-course/:id", courseController.getSingleCourse)
router.delete("/academic-course/:id", courseController.getDeleteCourse)

router.patch("/academic-course/:id", auth(User_Role.admin), validateRequest(updateCourseValidationSchema),courseController.updateCourse)

router.put("/academic-course/:courseId/assignFaculties",validateRequest(courseFacultyValidation), courseController.assignFaculties)

router.delete("/academic-course/:courseId/removeFaculties", auth(User_Role.admin), validateRequest(courseFacultyValidation), courseController.removeFaculties)



export const courseRouter = router