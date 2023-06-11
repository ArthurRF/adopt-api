import { PetSex, PetSize } from '@prisma/client';

interface ICreatePetProps {
  name: string;
  description?: string;
  sex?: PetSex;
  size?: PetSize;
  castrated?: boolean;
  age?: number;
}

export { ICreatePetProps };
