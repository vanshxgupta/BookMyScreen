import cron from "node-cron";
import dayjs from "dayjs";

import { ShowModel }
from "../modules/show/show.model";

import {
  seedShowForDate
} from "../scripts/components/seed-shows";



export const runShowMaintenance =
async () => {

  try {

    console.log(
      "Running daily show cron..."
    );

    const today =
      dayjs().startOf("day");



    // DELETE EXPIRED SHOWS

    const allShows =
      await ShowModel.find({});

    const expiredDates =
      new Set<string>();

    for (const show of allShows) {

      const showDate =
        dayjs(
          show.date,
          "DD-MM-YYYY"
        ).startOf("day");

      if (
        showDate.isBefore(today)
      ) {

        expiredDates.add(show.date);
      }
    }

    for (
      const date
      of expiredDates
    ) {

      await ShowModel.deleteMany({
        date
      });

      console.log(
        `Deleted ${date}`
      );
    }



    // GET EXISTING DATES

    const existingShows =
      await ShowModel.distinct(
        "date"
      );

    const existingDates =
      new Set(existingShows);



    // ENSURE NEXT 7 DAYS

    for (
      let i = 0;
      i < 7;
      i++
    ) {

      const futureDate =
        today
          .add(i, "day")
          .format("DD-MM-YYYY");



      // IF ANY SHOW EXISTS
      // SKIP WHOLE DATE

      if (
        existingDates.has(
          futureDate
        )
      ) {

        continue;
      }

      await seedShowForDate(
        dayjs(
          futureDate,
          "DD-MM-YYYY"
        )
      );

      console.log(
        `Added ${futureDate}`
      );
    }

    console.log(
      "Next 7 days synced"
    );

  } catch (err) {

    console.log(err);
  }
};



export const startShowCron = () => {

  cron.schedule(

    "0 0 * * *", //runs every midnight

    // "*/1 * * * *", // for tsting , runs every minute 

    runShowMaintenance,

    {
      timezone: "Asia/Kolkata"
    }
  );

};