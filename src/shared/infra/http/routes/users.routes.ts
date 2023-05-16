import { Router } from 'express';
import { Container } from 'typedi';

import { UsersController } from '@modules/users/controllers/users.controller';

import { RateLimiterMiddleware } from '../middlewares/rate-limiter.middleware';

const usersController = Container.get(UsersController);

const usersRoutes = Router();

usersRoutes.post('/register', RateLimiterMiddleware, usersController.register);
usersRoutes.post('/login', RateLimiterMiddleware, usersController.login);
usersRoutes.post(
  '/refresh-token',
  RateLimiterMiddleware,
  usersController.refreshToken
);

export { usersRoutes };
