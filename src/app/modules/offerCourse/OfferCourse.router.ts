import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { offerCourseValidation, updateOfferCourseValidation } from './OfferCourse.Validation'
import { offerCourseController } from './OfferCourse.controler'

const router = express.Router()


router.post("/create-offer-course", validateRequest(offerCourseValidation), offerCourseController.createOfferCourse)
// router.get('/all-offer-course', offerCourseController.getAllOfferedCourses);

// router.get('/all-offer-course/:id', offerCourseController.getSingleOfferedCourses);

router.patch(
    '/:id',
    validateRequest(updateOfferCourseValidation),
    offerCourseController.updateOfferedCourse,
);

router.get('/', offerCourseController.getAllOfferedCourses);

router.get('/:id', offerCourseController.getSingleOfferedCourse);

router.delete(
    '/:id',
    offerCourseController.deleteOfferedCourseFromDB,
);


export const offerCourseRouter = router