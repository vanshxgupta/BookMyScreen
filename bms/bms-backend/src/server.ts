import app from "./app";
import { config } from "./config/config";
import connectDb from "./config/db";

const startServer = async () => {
  const port = config.port;

  //connect to db

  await connectDb();

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();