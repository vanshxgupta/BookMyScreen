import mongoose, { ClientSession, mongo, Types } from "mongoose";
import { generateSeatLayout, groupShowsByTheatreAndMovie } from "../../utils";
import { IShow } from "./show.interface";
import { ShowModel } from "./show.model";

//1. Create a show
export const createShow = async (showData: IShow) => {
  const seatLayout = generateSeatLayout();
  const showToCreate = { ...showData, seatLayout };

  return await ShowModel.create(showToCreate);
};


//2. get shows by movie date and location
export const getShowsByMovieDateLocation = async (
  movieId: string,
  date: string,
  location: string,
) => {
  const query: any = {
    movie: new Types.ObjectId(movieId),
    location: { $regex: new RegExp(location, "i") },
  };

  if (date) {
    query.date = date;
  }

  const shows = await ShowModel.find(query)
    .populate("movie theatre") 
    .sort({ startTime: 1 });

    //populate() in MongoDB + Mongoose is used to replace an ObjectId reference with the actual document data.
    // Populate both the movie field and the theatre field.
    //.populate("movie theatre") is same as ->  .populate("movie").populate("theatre")

  const groupedShows = groupShowsByTheatreAndMovie(shows);

  return groupedShows;
};


//3. get show by id
export const getShowById = async (showId: string) => {
  return await ShowModel.findById(showId).populate("movie theatre");
};


//4. update seat status

// ShowModel.updateOne(
//    FILTER,
//    UPDATE,
//    OPTIONS
// )

export const updateSeatStatus = async (
  showId: string,
  row: string,
  seatNumber: number,
  status: "AVAILABLE" | "BOOKED" | "BLOCKED",
)=>{
    return await ShowModel.updateOne(

    // FILTER -> Find the show document with the given showId and the matching seat row.
    {
        _id:new Types.ObjectId(showId), 
        "seatLayout.row": row
    },
    
   // UPDATE -> Update the status field of the matched seat inside the matched row.
    {
        $set: {
            "seatLayout.$.seats.$[elem].status": status
        }
    },
    // OPTIONS -> Use arrayFilters to find the specific seat whose number matches seatNumber.
    {
        arrayFilters: [
            { "elem.number": seatNumber }
        ]
    })
}


// call:
//show123,A,2,BOOKED


//data in db:

// const show = {
//   _id: "show123",

//   seatLayout: [
//     {
//       row: "A",
//       seats: [
//         { number: 1, status: "AVAILABLE" },
//         { number: 2, status: "AVAILABLE" },
//         { number: 3, status: "BOOKED" }
//       ]
//     },

//     {
//       row: "B",

//       seats: [
//         { number: 1, status: "AVAILABLE" },
//         { number: 2, status: "AVAILABLE" }
//       ]
//     }
//   ]
// };

// FILTER -> Which document and row should MongoDB find?

// UPDATE -> Which field should be updated in the matched array element?

// OPTIONS -> Which specific array element should be updated using arrayFilters?