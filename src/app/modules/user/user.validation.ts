import z from 'zod';


const userValidationWithZod=z.object({
    password: z.string()
   
   


})

export default userValidationWithZod