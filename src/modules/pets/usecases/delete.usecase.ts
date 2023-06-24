import { Inject, Service } from 'typedi';
import { IPetsRepository } from '../repositories/interfaces/i-pets.repository';

interface IProps {
  ids: number[];
}

@Service()
export class DeletePetsUseCase {
  constructor(
    @Inject('PetsRepository')
    private petsRepository: IPetsRepository
  ) {}

  async execute({ ids }: IProps): Promise<void> {
    await this.petsRepository.deleteMany(ids);
  }
}
