import prisma from '@shared/infra/db-connectors/prisma';
import { Pet } from '@prisma/client';
import { IPetsRepository } from '../interfaces/i-pets.repository';
import { ICreatePetProps } from '../props/i-create.props';

export class PetsRepository implements IPetsRepository {
  public async list(): Promise<Pet[]> {
    return prisma.pet.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  public async create({
    name,
    age,
    castrated,
    description,
    sex,
    size,
  }: ICreatePetProps): Promise<Pet> {
    return prisma.pet.create({
      data: {
        name,
        age,
        castrated,
        description,
        sex,
        size,
      },
    });
  }

  public async deleteMany(ids: number[]): Promise<void> {
    await prisma.pet.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
