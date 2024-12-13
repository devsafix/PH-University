import { z } from "zod";



const timeStringSchema = z.string().refine(
    (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
        return regex.test(time);
    },
    {
        message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
);

export const offerCourseValidation = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number(),
        section: z.number(),
        days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    }).refine((body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}:00`)
        const endTime = new Date(`1970-01-01T${body.endTime}:00`)

        return endTime > startTime
    }, {
        message: 'Start time should be before End time !  ',
    })
})
export const updateOfferCourseValidation = z.object({
    body: z.object({
       
        faculty: z.string(),
        maxCapacity: z.number(),
        days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
    }).refine((body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}:00`)
        const endTime = new Date(`1970-01-01T${body.endTime}:00`)

        return endTime > startTime
    }, {
        message: 'Start time should be before End time !  ',
    })
})