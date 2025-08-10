import * as express from 'express';
import { authentication } from '../middleware/authentication';
import { UserController } from '../controllers/user.controllers';
import { authorization } from '../middleware/authorization';
import { AuthController } from '../controllers/auth.controller';
import { validateDto } from '../middleware/validateDto';
import { LoginDto, SignUpDto, UpdateUserDto } from '../dto/user.dto';
const Router = express.Router();

Router.get('/users', authentication, authorization(['admin']), UserController.getUsers);
Router.get('/profile', authentication, authorization(['user', 'admin']), AuthController.getProfile);
Router.post('/sign-up', validateDto(SignUpDto), UserController.signUp);
Router.post('/login', validateDto(LoginDto), AuthController.login);
Router.put('/update/:id', authentication, authorization(['user', 'admin']), validateDto(UpdateUserDto), UserController.updateUser);
Router.delete('/delete/:id', authentication, authorization(['admin']), UserController.deleteUser);
export { Router as userRouter };
