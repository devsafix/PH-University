import z from 'zod';

const userValidationWithZod = z.object({
  password: z
    .string({
      invalid_type_error:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
    .max(20, { message: ' Password must be at most 20 characters long.' })
    .optional(),
});

export default userValidationWithZod;
