import { z } from "zod";

export const logInValidationSchema=z.object({
    body:z.object({
        id: z.string({ required_error: "id is Required" }),
        password:z.string({required_error:"Password is Required"})
    })
})
