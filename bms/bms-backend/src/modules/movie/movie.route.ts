import express from 'express'
import * as MovieController from './movie.controller'

const router=express.Router();

router.post('/',MovieController.createMovie);
router.get('/',MovieController.getAllMovies);
router.get('/recommended',MovieController.getTopRecommendedMovies);
router.get('/:id',MovieController.getMovieById);

export default router;