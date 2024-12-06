import { z } from "zod"

const academicDepartmentValidation=z.object({
    body:z.object({
        name:z.string(),
        academicfaculty:z.string({required_error:"academic faculty is required"})
    })
})


export default academicDepartmentValidation