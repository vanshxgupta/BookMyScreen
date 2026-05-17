import { IMovie } from "./movie.interface";
import { MovieModel } from "./movie.model";


// services:
//1)createMovie
// 2)getallmovie
// 3) getmoviebyid
// 4)gettopmoviebyvotes



//1)createMovie
export const createMovie=async(movie:IMovie) =>{//Creates a new movie document in MongoDB.
    return await MovieModel.create(movie);//Mongoose inserts data into database.
}

// 2)getallmovie
export const getAllMovies=async()=>{
    return await MovieModel.find()
    .sort({releaseDate:-1});
    //sorted so that latest movies will come first
}

// 3) getmoviebyid
export const getMovieById=async(id:string)=>{
    return await MovieModel.findById(id);//Fetches one movie using MongoDB _id
}

// 4)gettopmoviebyvotes
export const getTopMoviesByVotes=async(limit:number)=>{
    return await MovieModel.find()
    .sort({ votes: -1 })
    .limit(limit);
}
