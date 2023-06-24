import { IPetsRepository } from '@modules/pets/repositories/interfaces/i-pets.repository';
import { PetsRepository } from '@modules/pets/repositories/implementations/pets.repository';
import { ListPetsUseCase } from '../list.usecase';
import { CreatePetUseCase } from '../create.usecase';
import { DeletePetsUseCase } from '../delete.usecase';

let petsRepository: IPetsRepository;
let createPetUseCase: CreatePetUseCase;
let listPetsUseCase: ListPetsUseCase;
let deletePetsUseCase: DeletePetsUseCase;

describe('ListPetsUseCase', () => {
  beforeEach(() => {
    petsRepository = new PetsRepository();
    createPetUseCase = new CreatePetUseCase(petsRepository);
    listPetsUseCase = new ListPetsUseCase(petsRepository);
    deletePetsUseCase = new DeletePetsUseCase(petsRepository);
  });

  it('should be defined', () => {
    expect(deletePetsUseCase).toBeDefined();
  });

  it('should be able to delete many pets', async () => {
    const firstFakeName = 'Destany';
    const secondFakeName = 'Lance';

    await createPetUseCase.execute({
      name: firstFakeName,
    });
    await createPetUseCase.execute({
      name: secondFakeName,
    });
    const firstPetsList = await listPetsUseCase.execute();

    expect(firstPetsList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: firstFakeName,
        }),
        expect.objectContaining({
          name: secondFakeName,
        }),
      ])
    );

    await deletePetsUseCase.execute({ ids: firstPetsList.map(pet => pet.id) });

    const secondPetsList = await listPetsUseCase.execute();
    expect(secondPetsList).toEqual([]);
  });
});
