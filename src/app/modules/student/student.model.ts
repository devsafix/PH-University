
import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Name, staticModel, Student } from './student.interface';


import validator from 'validator';





const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'First name us required,,,'],
    maxlength: [20, 'maximum 20 charter'],
    trim: true, // remove space

    // this is a custom validation
    //  validate:{
    //   validator:function(value:string){
    //     return value==="Kazi"
    //   },
    //   message:"{VALUE} is not capitalize"

    //  }
  },
  middleName: { type: String },
 
  lastName: {
    type: String,
    required: [true, 'Last name us required,,,'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: String,
  fatherOccupation: String,
  fatherContactNO: String,
  motherName: String,
  motherOccupation: String,
  motherContactNO: String,
});
const localSchema = new Schema<LocalGuardian>({
  name: String,
  occupation: String,
  contactNo: String,
  address: String,
});

const studentSchema = new Schema<Student, staticModel>({
  id: { type: String, required: true, unique: true },

  user: { type: Schema.Types.ObjectId, required: true, unique: true, ref:"user"},
  
  name: {
    type: nameSchema,
    required: true,
  },
  admissionSemester: { type: Schema.Types.ObjectId, ref:"Semester"},
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid ',
    },
  },
  gender: {
    type: String,
    enum: {
      values: ['female', 'male'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: String,
  contactNumber: String,
  emergencyContactNO: String,
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} not valid',
    },
    required: true,
  },
  presentAdd: String,
  permanentAddress: String,
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localSchema,
    required: true,
  },
  image: String,
  academicDepartment:{
    type:Schema.Types.ObjectId,
    ref: "academicDepartment"


  },
  
  isDelete: { type: Boolean, default: false }
},{
  toJSON:{
    virtuals:true
  }
}
);

// virtual

studentSchema.virtual("fullName").get(function(){
  return `${this.name.firstName} ${this.name.lastName}`
})







// pre save middleware  ---document middleware





// query middleware

studentSchema.pre("find", function (next) {

  this.find({ isDelete: { $ne: true } })

  next()

})
studentSchema.pre("findOne", function (next) {

  this.find({ isDelete: { $ne: true } })

  next()

})
studentSchema.pre("aggregate", function (next) {

  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } })
  next()

})






// create a instance method
// studentSchema.methods.isExists= async (id:string) => {
//   const isExists= await StudentModel.findOne({id})
//   return isExists
// }


// custom statics method

studentSchema.statics.isExists = async (id: string) => {
  const isExist = await StudentModel.findOne({ id })
  return isExist
}

//model

export const StudentModel = model<Student, staticModel>('Student', studentSchema);
