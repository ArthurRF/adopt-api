import { Inject, Service } from 'typedi';
import { IPetsRepository } from '../repositories/interfaces/i-pets.repository';

@Service()
export class ListPetsUseCase {
  constructor(
    @Inject('PetsRepository')
    private petsRepository: IPetsRepository
  ) {}

  async execute(): Promise<any> {
    return this.petsRepository.list();
  }
}
