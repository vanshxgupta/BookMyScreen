
import * as ShowController from "./show.controller";
import { Router } from "express";

const router=Router();

router.post("/",ShowController.createShow);
router.get("/",ShowController.getShowsByMovieDateLocation);
router.get("/:id",ShowController.getShowById);
// router.put("/:showId",ShowController.updateSeatStatus);

export default router;