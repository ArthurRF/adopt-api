import { IPetsRepository } from '@modules/pets/repositories/interfaces/i-pets.repository';
import { PetsRepository } from '@modules/pets/repositories/implementations/pets.repository';
import { PetSex, PetSize } from '@prisma/client';
import { CreatePetUseCase } from '../create.usecase';

let petsRepository: IPetsRepository;
let createPetUseCase: CreatePetUseCase;

describe('CreatePetUseCase', () => {
  beforeEach(() => {
    petsRepository = new PetsRepository();
    createPetUseCase = new CreatePetUseCase(petsRepository);
  });

  it('should be defined', () => {
    expect(createPetUseCase).toBeDefined();
  });

  it('should create a pet', async () => {
    const fakeName = 'Lauryn';

    const result = createPetUseCase.execute({
      name: fakeName,
    });

    expect(result).resolves.toHaveProperty('id');
  });

  it('should save the pet properties right', async () => {
    const fakeProps = {
      name: 'Lauryn',
      age: 3,
      castrated: true,
      description: 'Pet mock description',
      sex: PetSex.M,
      size: PetSize.SMALL,
    };

    const result = createPetUseCase.execute(fakeProps);

    expect(result).resolves.toHaveProperty('name', fakeProps.name);
    expect(result).resolves.toHaveProperty('age', fakeProps.age);
    expect(result).resolves.toHaveProperty('castrated', fakeProps.castrated);
    expect(result).resolves.toHaveProperty(
      'description',
      fakeProps.description
    );
    expect(result).resolves.toHaveProperty('sex', fakeProps.sex);
    expect(result).resolves.toHaveProperty('size', fakeProps.size);
  });
});
