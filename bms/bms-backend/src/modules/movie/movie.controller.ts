import { Request, Response, NextFunction } from "express";
import * as MovieService from "./movie.service";
import {MovieInput}  from "./movie.validation";

export const createMovie=async(req: Request<{},{},MovieInput>,res:Response,next:NextFunction) => {
    try {
        const movie=await MovieService.createMovie(req.body);
        res.status(200).json({movie});

    } catch (error) {
        next(error);
    }
}

export const getAllMovies=async(req: Request,res:Response,next:NextFunction) => {
    try {
        const movies=await MovieService.getAllMovies();
        res.status(200).json({movies})
    }
    catch (error) {
        next(error);
    }   
}

export const getMovieById=async(req: Request,res:Response,next:NextFunction) => {
    try {
        const movie=await MovieService.getMovieById(req.params.id);
        res.status(200).json({movie})
    }
    catch (error) {
        next(error);
    }   
}

export const getTopRecommendedMovies=async(req: Request,res:Response,next:NextFunction) => {
    try {
        const topmovies=await MovieService.getTopMoviesByVotes(5);
        res.status(200).json({topmovies})
    }
    catch (error) {
        next(error);
    }   
}

