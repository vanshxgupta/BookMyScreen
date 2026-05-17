import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/index";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(cookieParser());
app.use(express.json());


//all routes
app.use("/api/v1",router);

app.get("/", (_, res) => {
  res.json({
    message: "Welcome to BookMyScreen API",
  });
});

export default app;
