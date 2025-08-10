import * as express from 'express';
import { authentication } from '../middleware/authentication';
import { MovieController } from '../controllers/movie.controllers';
import { authorization } from '../middleware/authorization';
import { validateDto } from '../middleware/validateDto';
import { CreateMovieDto, UpdateMovieDto } from '../dto/movie.dto';

const Router = express.Router();

Router.get('/movies', authentication, MovieController.getAllMovies);
Router.post('/movies', authentication, validateDto(CreateMovieDto), MovieController.createMovie);

Router.put('/movies/:id', authentication, authorization(['admin']), validateDto(UpdateMovieDto), MovieController.updateMovie);
Router.delete('/movies/:id', authentication, authorization(['admin']), MovieController.deleteMovie);
export { Router as movieRouter };
