import express from 'express';

import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { User_Role } from '../user/user.const';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/',auth(User_Role.admin,User_Role.faculty), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;