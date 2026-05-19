import {Request, Response ,NextFunction} from "express";
import * as TheatreService from "./theatre.service";
import { TheatreInput } from "./theatre.validation";

export const createTheatre=async(req: Request<{},{},TheatreInput>,res:Response,next:NextFunction) => {
    try {
        const theatre=await TheatreService.createTheatre(req.body);
        res.status(200).json({
            success: true,
            message: "Theatre created successfully",
            data: theatre
        });
    } catch (error) {
        next(error);
    }
}

export const getTheatres=async(req: Request,res:Response,next:NextFunction) => {
    try {
        const {state}=req.query;
        let theatres;
        
        if(state){
            theatres=await TheatreService.getTheatreByState(state as string);   
        }
        else{
            theatres=await TheatreService.getAllTheatres();
        }
        res.status(200).json({
            success: true,
            message: "Theatres fetched successfully",
            data: theatres
        });
    }
    catch (error) {
        next(error);
    }   
}
