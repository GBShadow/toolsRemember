import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  const decoded = verify(token, 'hashMD5');
}
