import express from "express";
import movieRouter from "../modules/movie/movie.route";
import theatreRouter from "../modules/theatre/theatre.routes";
import showRouter from "../modules/show/show.route";

const router = express.Router();

router.use("/movies",movieRouter);
router.use("/theatres",theatreRouter);
router.use("/shows",showRouter);

export default router;