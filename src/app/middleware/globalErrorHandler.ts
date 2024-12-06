/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TerrorSource } from '../interface/eror';
import config from '../config';
import handleZodError from '../errors/zodEror';
import mongooseValidationError from '../errors/mongooseErorr';
import handleCastError from '../errors/castError';
import handleDuplicateError from '../errors/duplicateError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let errorSources: TerrorSource = [
        {
            path: "",
            message: "Something went wrong"
        }
    ];

  

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }else if(err?.name==="ValidationError"){
        const simplifiedError = mongooseValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }else if(err?.name==="CastError"){
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }else if (err?.code === 11000){
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSource;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack:config.node_env==="development"? err?.stack : null
    });
};

export default errorHandler;
