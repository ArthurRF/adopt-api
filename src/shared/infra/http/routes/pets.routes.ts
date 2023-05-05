import { Router } from 'express';

import { inversifyContainer } from '@shared/infra/containers/inversify.config';
import { PetsController } from '@modules/pets/controllers/pets.controller';
import { RateLimiterMiddleware } from '../middlewares/rate-limiter.middleware';

const petsController = inversifyContainer.get(PetsController);

const petsRoutes = Router();

petsRoutes.get('/', RateLimiterMiddleware, petsController.list);

export { petsRoutes };
