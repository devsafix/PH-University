import { userRoutes } from './../modules/user/user.routes';
import { studentRoutes } from './../modules/student/student.routes';
import express from 'express'


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
]

modulesRoute.forEach(route => router.use(route.path, route.route))

export default router