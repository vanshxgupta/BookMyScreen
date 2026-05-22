// Ye REAL automatic maintenance system hai.

import cron from "node-cron";
import dayjs from "dayjs";

import { ShowModel }
from "../modules/show/show.model";

import { seedShowForDate } from "../scripts/components/seed-shows";

export const startShowCron = () => {

  cron.schedule(
    
    "0 0 * * *", // means every midnight

    // "0 * * * *",// means every 1 hour 

    // "*/10 * * * *"// means every 10 minutes

    async () => {

      try {

        console.log(
          "Running daily show cron..."
        );

        const today =
          dayjs().startOf("day");

        // delete expired shows only
        await ShowModel.deleteMany({
          date: {
            $lt: 
            today.format("DD-MM-YYYY")
            //means less than today
          }
        });

        console.log(
          "Expired shows deleted"
        );

        // add ONLY next future day
        const futureDate =
          today.add(6, "day");

        await seedShowForDate(
          futureDate
        );

        console.log(
          "Next future day added"
        );

      } catch(err) {

        console.log(err);
      }

    },

    {
      timezone: "Asia/Kolkata"
    }
  );
};