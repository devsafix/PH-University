import { userRoutes } from './../modules/user/user.routes';
import { studentRoutes } from './../modules/student/student.routes';
import express from 'express'
import semesterRouter from '../modules/academicSemister/semester.routes';
import { academicFacultyRouter } from '../modules/AcademicFaculty/academicFaculty.router';
import { academicDepartmentRouter } from '../modules/AcademicDepartment/academicDepartment.router';
import { courseRouter } from '../modules/course/course.route';
import { semesterRegistrationRouter } from '../modules/semesterRegistration/semesterRegistration.router';


const router = express.Router()





const modulesRoute = [
    {
        path: "/students",
        route: studentRoutes
    },
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/semester",
        route: semesterRouter
    },
    {
        path: "/academicFaculty",
        route: academicFacultyRouter
    },
    {
        path: "/academicDepartment",
        route: academicDepartmentRouter
    },
    {
        path: "/course",
        route: courseRouter
    },
    {
        path: "/semester-registration",
        route: semesterRegistrationRouter
    },
]

modulesRoute.forEach(route => router.use(route.path, route.route))

export default router