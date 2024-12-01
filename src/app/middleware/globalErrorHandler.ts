/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500
    res.status(statusCode).json({
        success: false,
        message: err.message || "something went wrong",
        error: err
    })
}

export default errorHandler