import mongoose, { Schema } from 'mongoose';
import { TOfferedCourse } from './offerCourse.interface';



const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
    {
        semesterRegistration: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'semesterRegistration',
        },
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Semester',
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'AcademicFaculty',
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'academicDepartment',
        },
        course: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'courseFaculty',
        },
        faculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Faculty',
        },
        maxCapacity: {
            type: Number,
            required: true,
        },
        section: {
            type: Number,
            required: true,
        },
        days: [{
            type: String,
            enum: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        }],
    
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const OfferedCourseModel = mongoose.model<TOfferedCourse>(
    'OfferedCourse',
    offeredCourseSchema,
);