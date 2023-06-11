import { IPetsRepository } from '@modules/pets/repositories/interfaces/i-pets.repository';
import { PetsRepository } from '@modules/pets/repositories/implementations/pets.repository';
import { ListPetsUseCase } from '../list.usecase';
import { CreatePetUseCase } from '../create.usecase';

let petsRepository: IPetsRepository;
let createPetUseCase: CreatePetUseCase;
let listPetsUseCase: ListPetsUseCase;

describe('ListPetsUseCase', () => {
  beforeEach(() => {
    petsRepository = new PetsRepository();
    createPetUseCase = new CreatePetUseCase(petsRepository);
    listPetsUseCase = new ListPetsUseCase(petsRepository);
  });

  it('should be defined', () => {
    expect(listPetsUseCase).toBeDefined();
  });

  it('should return an array of pets', async () => {
    const fakeName = 'Waldo';

    await createPetUseCase.execute({
      name: fakeName,
    });
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
