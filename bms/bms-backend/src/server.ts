import app from "./app";
import { config } from "./config/config";
import connectDb from "./config/db";
import { registerSocketHandlers } from "./socket/sockethandlers";

import {
  startShowCron,
  runShowMaintenance
} from "./cron/show.cron";

import "./config/redis";
 
import http from 'http';
import {Server} from "socket.io"

const startServer = async () => {

  const port = config.port;

  await connectDb();

  // await runShowMaintenance();

  // startShowCron();


  //create HTTP server from Express app
  const httpServer=http.createServer(app);

  //Create socket.io server
  const io =new Server(httpServer,{
    cors:{
      origin:"http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  })



  // "connection" is a built-in Socket.IO event.
//   connection
// disconnect
// connect_error
// reconnect


    io.on("connection", (socket) => {
    console.log("✅ User connected: ", socket.id);
    registerSocketHandlers(socket, io);

    socket.on("disconnect", (reason) => {
      console.log("❌ User disconnected: ", socket.id, "Reason", reason);
    });

  });

  httpServer.listen(port, () => {

    console.log(
      `Listening on port: ${port}`
    );

  });

};

startServer();