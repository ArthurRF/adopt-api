import { Pet } from '@prisma/client';

export interface IPetsRepository {
  list(): Promise<Pet[]>;
}
