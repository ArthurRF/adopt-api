import { Router } from 'express';

import { usersRoutes } from './users.routes';
import { petsRoutes } from './pets.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/pets', petsRoutes);

export default routes;
