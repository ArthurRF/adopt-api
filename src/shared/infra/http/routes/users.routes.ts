import { Router } from 'express';

import { inversifyContainer } from '@shared/infra/containers/inversify.config';
import { UsersController } from '@modules/users/controllers/users.controller';
import { RateLimiterMiddleware } from '../middlewares/rate-limiter.middleware';

const usersController = inversifyContainer.get(UsersController);

const usersRoutes = Router();

usersRoutes.post('/register', RateLimiterMiddleware, usersController.register);

export { usersRoutes };
