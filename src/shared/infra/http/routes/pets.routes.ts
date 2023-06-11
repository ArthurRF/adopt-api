import { Router } from 'express';
import { Container } from 'typedi';

import { PetsController } from '@modules/pets/controllers/pets.controller';
import { RateLimiterMiddleware } from '../middlewares/rate-limiter.middleware';

const petsController = Container.get(PetsController);

const petsRoutes = Router();

petsRoutes.get('/', RateLimiterMiddleware, petsController.list);
petsRoutes.post('/', RateLimiterMiddleware, petsController.create);

export { petsRoutes };
