
export const User_Role = {
    student: "student",
    faculty: "faculty",
    admin: "admin"
} as const

export type TUserRole = keyof typeof User_Role