import prisma from '@shared/infra/db-connectors/prisma';
import { Pet } from '@prisma/client';
import { IPetsRepository } from '../interfaces/i-pets.repository';

export class PetsRepository implements IPetsRepository {
  public async list(): Promise<Pet[]> {
    return prisma.pet.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
