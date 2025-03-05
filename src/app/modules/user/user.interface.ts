export type TUser = {
  user: import('mongoose').Types.ObjectId;
  id: string;
  email: string;
  password?: string | undefined;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
};
