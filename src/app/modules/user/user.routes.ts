import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import studentSchemaWIthZod from '../student/student.zod';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { User_Role } from './user.const';

const router = express.Router();

router.post(
  '/create-user',
  auth(User_Role.admin),
  validateRequest(studentSchemaWIthZod),
  userController.createUser,
);

router.post(
  '/create-faculty',
  auth(User_Role.admin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  // auth(User_Role.admin),
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);
router.get('/me', auth('admin', 'faculty', 'student'), userController.getMe);

router.post('/change-status/:id', auth('admin'), userController.changeStatus);

export const userRoutes = router;
