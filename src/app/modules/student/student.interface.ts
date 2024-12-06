import { Model, Types } from "mongoose";

export type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNO: string;
  motherName: string;
  motherOccupation: string;
  motherContactNO: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  user:Types.ObjectId,
  pass?:string;
  name: Name;
  academicDepartment:Types.ObjectId,
  email: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNO: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAdd: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  image?: string;
  admissionSemester:Types.ObjectId,
  isDelete:boolean
};

// create a instance method
// export type StudentMethod={
//   isExists(id:string) : Promise<Student|null>
  
// }

// export type FirstModel= Model<Student,Record<string,unknown>,StudentMethod>


// create a static method

export interface staticModel extends Model<Student> {
  // eslint-disable-next-line no-unused-vars
  isExists(id:string): Promise< Student |null>
}



