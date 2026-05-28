import mongoose from 'mongoose'
import { config } from './config';

const connectDb= async()=>{
    try {
        await mongoose.connect(config.databaseReplicaSet as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}

export default connectDb;