import { z } from "zod";


const semesterValidation = z.object({
    body: z.object({
        name: z.enum(["Autumn", "Summer", "Fall"], {
            errorMap: () => ({ message: '{VALUE} is not valid' }),
        }),
        code: z.enum(["01", "02", "03"], { errorMap: () => ({ message: '{VALUE} is not valid' }) }),
        year: z.string(),
        startMonth: z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ], { errorMap: () => ({ message: '{VALUE} is not valid' }) }),
        endMonth: z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ], { errorMap: () => ({ message: '{VALUE} is not valid' }) }),
    })
})


export default semesterValidation