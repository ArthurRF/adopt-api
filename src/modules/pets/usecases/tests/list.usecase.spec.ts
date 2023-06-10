import { IPetsRepository } from '@modules/pets/repositories/interfaces/i-pets.repository';
import { PetsRepository } from '@modules/pets/repositories/implementations/pets.repository';
import prisma from '@shared/infra/db-connectors/prisma';
import { ListPetsUseCase } from '../list.usecase';

let petsRepository: IPetsRepository;
let listPetsUseCase: ListPetsUseCase;

describe('ListPetsUseCase', () => {
  beforeEach(() => {
    petsRepository = new PetsRepository();
    listPetsUseCase = new ListPetsUseCase(petsRepository);
  });

  it('should be defined', () => {
    expect(listPetsUseCase).toBeDefined();
  });

  it('should return an array of pets', async () => {
    const fakeName = 'Waldo';

    // todo: change by the create pet use case when it exists
    await prisma.pet.create({ data: { name: fakeName } });
    const pets = await listPetsUseCase.execute();

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
        }),
      ])
    );
  });
});
