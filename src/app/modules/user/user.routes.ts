import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import studentSchemaWIthZod from '../student/student.zod';



const router = express.Router();

router.post('/create-user',validateRequest(studentSchemaWIthZod), userController.createUser);



export const userRoutes = router;
