import express from 'express'
import { semesterController } from './semester.controller'
import validateRequest from '../../middleware/validateRequest'
import semesterValidation from './semester.validation'

const semesterRouter= express.Router()

semesterRouter.post("/create-academic-semester",validateRequest(semesterValidation),semesterController.createSemester)

// task-1-get all semester
semesterRouter.get("/all-semester",semesterController.getAllSemester)

// task-2 get one semester by id

semesterRouter.get("/single-semester/:id",semesterController.singleSemesterById)


// update one semester by id 
semesterRouter.put("/single-semester/:id", semesterController.updateSemesterById)



export default semesterRouter