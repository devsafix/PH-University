import { z } from "zod";

const preRequisiteValidationSchema=z.object({
    course:z.string(),
    isDeleted:z.boolean().optional()
})

const courseValidationSchema=z.object({
    body:z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourse: z.array(preRequisiteValidationSchema).optional()
    })
})

export const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourse: z.array(preRequisiteValidationSchema).optional()
    })
})

export const courseFacultyValidation=z.object({
   body:z.object({
       faculties: z.array(z.string())
   })
})


export default courseValidationSchema