import { PetsController } from '@modules/pets/controllers/pets.controller';
import { Container } from 'inversify';

const inversifyContainer = new Container();
inversifyContainer.bind<PetsController>(PetsController).to(PetsController);

export { inversifyContainer };
