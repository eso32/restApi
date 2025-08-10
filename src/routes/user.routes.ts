import * as express from 'express';
import { authentication } from '../middleware/authentication';
import { UserController } from '../controllers/user.controllers';
import { authorization } from '../middleware/authorization';
import { AuthController } from '../controllers/auth.controller';
const Router = express.Router();

Router.get('/users', authentication, authorization(['admin']), UserController.getUsers);
Router.get('/profile', authentication, authorization(['user', 'admin']), AuthController.getProfile);
Router.post('/sign-up', UserController.signUp);
Router.post('/login', AuthController.login);
Router.put('/update/:id', authentication, authorization(['user', 'admin']), UserController.updateUser);
Router.delete('/delete/:id', authentication, authorization(['admin']), UserController.deleteUser);
export { Router as userRouter };
