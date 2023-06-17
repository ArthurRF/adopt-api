import { Request, Response } from 'express';
import { Container, Service } from 'typedi';

import { AppError } from '@shared/errors/app.error';
import { ListPetsUseCase } from '../usecases/list.usecase';
import { CreatePetUseCase } from '../usecases/create.usecase';
import { CreatePetDTO } from './interfaces/i-create.dto';

@Service()
export class PetsController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listPetsUseCase = Container.get(ListPetsUseCase);

      const pets = await listPetsUseCase.execute();

      return res.status(200).json(pets);
    } catch (error: any) {
      if (error?.message) {
        throw new AppError(error?.message);
      }
      throw error;
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createPetUseCase = Container.get(CreatePetUseCase);

      const body = CreatePetDTO.parse(req.body);

      const createdPet = await createPetUseCase.execute(body);

      return res.status(201).json(createdPet);
    } catch (error: any) {
      if (error?.message) {
        throw new AppError(error?.message);
      }
      throw error;
    }
  }
}
