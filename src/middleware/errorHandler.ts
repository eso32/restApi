import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${error.message}`);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};
