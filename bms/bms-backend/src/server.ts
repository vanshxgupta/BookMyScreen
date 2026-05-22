import app from "./app";
import { config } from "./config/config";
import connectDb from "./config/db";
import { startShowCron } from "./cron/show.cron";

const startServer = async () => {
  const port = config.port;

  //connect to db

  await connectDb();

  startShowCron();

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();