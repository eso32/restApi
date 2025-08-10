import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User.entity';
import { encrypt } from '../helpers/encrypt';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: ' email and password required' });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!user || !isPasswordValid) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      }
      const token = encrypt.generateToken({ id: user.id });

      return res.status(StatusCodes.OK).json({ message: 'Login successful', user, token });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  static async getProfile(req: Request, res: Response) {
    if (!req[' currentUser']) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req[' currentUser'].id },
    });
    return res.status(StatusCodes.OK).json({ ...user, password: undefined });
  }
}
