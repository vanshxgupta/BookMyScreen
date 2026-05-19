import { ITheatre } from "./theatre.interface";
import { TheatreModel } from "./theatre.model";

//1) create theatre
export const createTheatre = async (data: ITheatre): Promise<ITheatre> => {
  return await TheatreModel.create(data); // Creates new document in MongoDB.
  //Equivalent MongoDB insert:-> db.theatres.insertOne(data)
};

//2) get all theatres
export const getAllTheatres = async (): Promise<ITheatre[]> => {
  return await TheatreModel.find();
};

//3) get theatre by id

export const getTheatreById = async (id: string): Promise<ITheatre | null> => {
  return await TheatreModel.findById(id);
};


//4) get theatre by state
export const getTheatreByState = async (state: string): Promise<ITheatre[]> => {
  return await TheatreModel.find({
    // This function fetches all theatres matching the given state name case-insensitively from MongoDB.
    state: {
      $regex: state,
      $options: "i",
    },
  });
};
