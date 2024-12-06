import { ZodError, ZodIssue } from "zod";
import { TerrorSource } from "../interface/eror";
import { Return } from "../interface/retrun";

const handleZodError = (zodError: ZodError):Return => {
    const errorSources: TerrorSource = zodError.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode: 400,
        message: " validation error",
        errorSource: errorSources
    };
};


export default handleZodError