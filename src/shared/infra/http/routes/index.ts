import { Router } from 'express';

import { petsRoutes } from './pets.routes';

const routes = Router();

routes.use('/pets', petsRoutes);

export default routes;
