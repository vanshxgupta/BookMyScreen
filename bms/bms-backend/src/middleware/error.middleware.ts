// Creates a centralized error-handling middleware.

import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const globalErrorHandler=(
    err:unknown,
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    let statusCode=500;
    let message="Something went wrong";

    let errors:{
        field?:string;
        message:string;
    }[]=[];


    // Handle Zod validation errors
    if(err instanceof ZodError){
        statusCode=400;
        message="Validation error";
        errors=err.issues.map((e)=>{
            return {
                field:e.path.join('.'),
                message:e.message
            }
        });
    }
    else if(err instanceof Error){// Handle generic errors
        message=err.message;
    }

    res.status(statusCode).json({
        success:false,
        message,
        errors
    });

}
