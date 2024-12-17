import { z } from "zod";

export const logInValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: "id is Required" }),
        password: z.string({ required_error: "Password is Required" })
    })
})
export const changePassWordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: "Old password is Required" }),
        newPassword: z.string({ required_error: "Password is Required" })
    })
})
export const reFreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: "Old password is Required" }),
        
    })
})
