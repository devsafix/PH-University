
import Joi from 'joi';

const nameSchema = Joi.object({
  firstName: Joi.string().max(20).trim().required().messages({
    'string.max': 'First name must be at most 20 characters',
    'any.required': 'First name is required',
  }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Last name must contain only letters',
      'any.required': 'Last name is required',
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().optional(),
  fatherOccupation: Joi.string().optional(),
  fatherContactNO: Joi.string().optional(),
  motherName: Joi.string().optional(),
  motherOccupation: Joi.string().optional(),
  motherContactNO: Joi.string().optional(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().optional(),
  occupation: Joi.string().optional(),
  contactNo: Joi.string().optional(),
  address: Joi.string().optional(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'ID is required',
  }),

  name: nameSchema.required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  gender: Joi.string().valid('female', 'male').required().messages({
    'any.only': "Gender must be 'female' or 'male'",
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  contactNumber: Joi.string().optional(),
  emergencyContactNO: Joi.string().optional(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required()
    .messages({
      'any.only': 'Invalid blood group',
      'any.required': 'Blood group is required',
    }),
  presentAdd: Joi.string().optional(),
  permanentAddress: Joi.string().optional(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  image: Joi.string().optional(),
  isActive: Joi.string()
    .valid('active', 'inActive')
    .default('active')
    .required()
    .messages({
      'any.only': "isActive must be 'active' or 'inActive'",
      'any.required': 'active status is not valid',
    }),
  isDelete:Joi.boolean().default(false)
});

export default studentValidationSchema;
