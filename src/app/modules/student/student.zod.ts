import z from 'zod';

const nameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'Maximum 20 characters allowed')
    .refine((value) => !!value, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: '{VALUE} is not valid',
    })
    .refine((value) => !!value, 'Last name is required'),
});

// Guardian schema
const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNO: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNO: z.string(),
});

// Local guardian schema
const localSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student schema
const studentSchemaWIthZod = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    students: z.object({
      name: nameSchema,
      email: z.string().email('Invalid email format').nonempty('Email is required'),
      gender: z.enum(['female', 'male'], {
        errorMap: () => ({ message: '{VALUE} is not valid' }),
      }),
      dateOfBirth: z.string(),
      contactNumber: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: '{VALUE} is not valid' }),
      }),
      presentAdd: z.string(),
      admissionSemester:z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localSchema,
      image: z.string().optional(),
    })
  })

});


export default studentSchemaWIthZod