import { PetsRepository } from '@modules/pets/repositories/implementations/pets.repository';
import { UsersTokensRepository } from '@modules/users/repositories/implementations/users-tokens.repository';
import { UsersRepository } from '@modules/users/repositories/implementations/users.repository';
import { Container } from 'typedi';

Container.set([
  { id: 'UsersRepository', value: new UsersRepository() },
  { id: 'UsersTokensRepository', value: new UsersTokensRepository() },
  { id: 'PetsRepository', value: new PetsRepository() },
]);
