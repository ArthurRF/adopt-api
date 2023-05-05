import { AppError } from '@shared/errors/app.error';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const opts = {
  points: 35, // points
  duration: 5, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

export async function RateLimiterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await rateLimiter.consume(request.ip);
  } catch {
    throw new AppError('Too many request, please try again after moments', 429);
  }

  return next();
}
