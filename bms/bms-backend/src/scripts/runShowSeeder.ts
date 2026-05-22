//intial seeding ke liye hai bas ye , isko baar baar use mat krna , vrna saara purana data delete ho jayega , aur naya data input  hoga
//isliye isko seed-shows.ts se alag file me banaya hai , taki galti se bhi baar baar run na ho jaye

import mongoose from "mongoose";

import { config } from "../config/config";

import { ShowModel }
from "../modules/show/show.model";

import { seedShow } from "./components/seed-shows";

mongoose
  .connect(config.databaseUrl as string)

  .then(async () => {

    console.log("DB connected");

    // delete old shows
    await ShowModel.deleteMany({});

    console.log(
      "Old shows deleted"
    );

    // create fresh 7 days
    await seedShow();

    console.log(
      "Shows seeded successfully"
    );

    mongoose.disconnect();
  })

  .catch((err) => {
    console.log(err);
  });