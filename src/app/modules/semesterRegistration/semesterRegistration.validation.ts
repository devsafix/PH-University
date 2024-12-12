import { z } from "zod";
import { status } from "./semesterRegistration.constant";

export const semesterRegistrationValidation=z.object({
    body:z.object({
        academicSemester: z.string(),
        status: z.enum([...status] as [string, ...string[]]),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit:z.number(),
        maxCredit: z.number()
    })
})
export const updateSemesterRegistrationValidation=z.object({
    body:z.object({
        academicSemester: z.string().optional(),
        status: z.enum([...status] as [string, ...string[]]).optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        minCredit:z.number().optional(),
        maxCredit: z.number().optional()
    })
})