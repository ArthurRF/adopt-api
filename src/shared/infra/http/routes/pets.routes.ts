import { Router } from 'express';
import { RateLimiterMiddleware } from '../middlewares/rate-limiter.middleware';
// import { container } from 'tsyringe';

// import { CreatePetController } from "@modules/pets/controllers/CreatePetController";

// const createPetController = container.resolve(CreatePetController);

const petsRoutes = Router();

petsRoutes.get('/', RateLimiterMiddleware, (req, res) => res.send(['animais']));

export { petsRoutes };
