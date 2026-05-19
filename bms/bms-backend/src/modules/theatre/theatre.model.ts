import mongoose from "mongoose"
import { ITheatre } from "./theatre.interface"

const theatreSchema= new mongoose.Schema<ITheatre>({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
},{timestamps: true})

export const TheatreModel=mongoose.model<ITheatre>("Theatre",theatreSchema)