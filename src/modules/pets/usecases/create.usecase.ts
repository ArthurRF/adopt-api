import { Inject, Service } from 'typedi';
import { PetSex, PetSize } from '@prisma/client';
import { IPetsRepository } from '../repositories/interfaces/i-pets.repository';

interface IProps {
  name: string;
  description?: string;
  sex?: PetSex;
  size?: PetSize;
  castrated?: boolean;
  age?: number;
}

@Service()
export class CreatePetUseCase {
  constructor(
    @Inject('PetsRepository')
    private petsRepository: IPetsRepository
  ) {}

  async execute({
    name,
    age,
    castrated,
    description,
    sex,
    size,
  }: IProps): Promise<any> {
    return this.petsRepository.create({
      name,
      age,
      castrated,
      description,
      sex,
      size,
    });
  }
}
