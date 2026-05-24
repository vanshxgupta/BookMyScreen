import app from "./app";
import { config } from "./config/config";
import connectDb from "./config/db";

import {
  startShowCron,
  runShowMaintenance
} from "./cron/show.cron";

const startServer = async () => {

  const port = config.port;

  await connectDb();

  await runShowMaintenance();

  startShowCron();

  app.listen(port, () => {

    console.log(
      `Listening on port: ${port}`
    );

  });

};

startServer();