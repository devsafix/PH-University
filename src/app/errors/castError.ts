import mongoose from "mongoose";
import { TerrorSource } from "../interface/eror";
import { Return } from "../interface/retrun";

const handleCastError=(err:mongoose.Error.CastError):Return=>{
    const sourceError:TerrorSource=[{
        path:err.path,
        message:err.message
    }]

    return {
        statusCode:400,
        message:"validation error",
        errorSource:sourceError
    }
}

export default handleCastError