import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import studentSchemaWIthZod from '../student/student.zod';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';



const router = express.Router();

router.post('/create-user',validateRequest(studentSchemaWIthZod), userController.createUser);

router.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    userController.createFaculty,
);

router.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    userController.createAdmin,
);



export const userRoutes = router;
