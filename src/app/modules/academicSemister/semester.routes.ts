import express from 'express'
import { semesterController } from './semester.controller'
import validateRequest from '../../middleware/validateRequest'
import semesterValidation from './semester.validation'

const semesterRouter= express.Router()

semesterRouter.post("/create-academic-semester",validateRequest(semesterValidation),semesterController.createSemester)


export default semesterRouter