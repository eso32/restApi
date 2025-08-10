import { Request, Response, NextFunction } from 'express';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

export function validateDto<T extends object>(dtoClass: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dtoClass, req.body, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
    });

    const validationErrors = await validate(instance as object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (validationErrors.length > 0) {
      const errors = validationErrors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Validation failed', errors });
    }

    req.body = instance as unknown as Record<string, unknown>;
    next();
  };
}
