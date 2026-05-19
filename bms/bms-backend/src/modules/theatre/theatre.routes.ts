import express from 'express'
import * as TheatreController from './theatre.controller'
import { TheatreSchema } from './theatre.validation';
import { validate } from '../../middleware/validate';

const router=express.Router();

router.post('/',validate(TheatreSchema) ,TheatreController.createTheatre);
router.get('/',TheatreController.getTheatres);

export default router;