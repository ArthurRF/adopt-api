import { Pet } from '@prisma/client';
import { ICreatePetProps } from '../props/i-create.props';

export interface IPetsRepository {
  list(): Promise<Pet[]>;
  create(data: ICreatePetProps): Promise<Pet>;
  deleteMany(ids: number[]): Promise<void>;
}
