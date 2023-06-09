import { Inject, Service } from 'typedi';
import { Pet } from '@prisma/client';
import { IPetsRepository } from '../repositories/interfaces/i-pets.repository';

@Service()
export class ListPetsUseCase {
  constructor(
    @Inject('PetsRepository')
    private petsRepository: IPetsRepository
  ) {}

  async execute(): Promise<Pet[]> {
    return this.petsRepository.list();
  }
}
