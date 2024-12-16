export type TUser={
    user: import("mongoose").Types.ObjectId;
    id:string;
    password?:string | undefined;
    needsPasswordChange:boolean;
    role:"admin"|"student"|"faculty";
    isDeleted:boolean;
    status:"in-progress" | "blocked"

}


