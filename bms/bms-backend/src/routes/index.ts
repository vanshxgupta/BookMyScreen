import express from "express";
import movieRouter from "../modules/movie/movie.route";
import theatreRouter from "../modules/theatre/theatre.routes";
import showRouter from "../modules/show/show.route";
import userRouter from "../modules/user/user.route";
import AuthRouter from "../modules/auth/auth.route";

const router = express.Router();

router.use("/movies",movieRouter);
router.use("/theatres",theatreRouter);
router.use("/shows",showRouter);
router.use("/users",userRouter);
router.use("/auth",AuthRouter);


export default router;