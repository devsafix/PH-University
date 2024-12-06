import mongoose from "mongoose";
import { TerrorSource } from "../interface/eror";
import { Return } from "../interface/retrun";


const mongooseValidationError=(err:mongoose.Error.ValidationError):Return=>{
    const errorSource: TerrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{
        return {
            path :val?.path,
            message:val?.message
        }
    })


    return {
        statusCode:400,
        message:"validation error",
        errorSource
    }
}

export default mongooseValidationError