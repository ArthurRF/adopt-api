import { Request, Response } from 'express';
import { Container, Service } from 'typedi';

import { ListPetsUseCase } from '../usecases/list.usecase';
import { CreatePetUseCase } from '../usecases/create.usecase';
import { CreatePetDTO } from './interfaces/i-create.dto';
import { DeletePetsUseCase } from '../usecases/delete.usecase';
import { DeleteManyPetsDTO } from './interfaces/i-delete-many.dto';

@Service()
export class PetsController {
  async list(req: Request, res: Response): Promise<Response> {
    const listPetsUseCase = Container.get(ListPetsUseCase);

    const pets = await listPetsUseCase.execute();

    return res.status(200).json(pets);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createPetUseCase = Container.get(CreatePetUseCase);

    const body = CreatePetDTO.parse(req.body);

    const createdPet = await createPetUseCase.execute(body);

    return res.status(201).json(createdPet);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deletePetsUseCase = Container.get(DeletePetsUseCase);

    const { ids } = DeleteManyPetsDTO.parse(req.query);

    await deletePetsUseCase.execute({ ids });

    return res.status(204).send();
  }
}
