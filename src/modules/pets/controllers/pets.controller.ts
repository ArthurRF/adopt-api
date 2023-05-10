import { Request, Response } from 'express';
import { Container, Service } from 'typedi';

import { ListPetsUseCase } from '../usecases/list.usecase';

@Service()
export class PetsController {
  async list(req: Request, res: Response): Promise<Response> {
    const listPetsUseCase = Container.get(ListPetsUseCase);

    const pets = await listPetsUseCase.execute();

    return res.status(200).json(pets);
  }
}
