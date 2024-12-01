import express from 'express';
import { studentController } from './student.controler';

const router = express.Router();



router.get('/student-allData', studentController.getAllData);
router.get('/:id', studentController.getSingleData);

router.delete("/:id",studentController.deleteStudent)

router.put("/:id",studentController.updateStudent)

export const studentRoutes = router;
