import { inversifyContainer } from '@shared/infra/containers/inversify.config';
import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { ListPetsUseCase } from '../usecases/list.usecase';

@injectable()
export class PetsController {
  async list(req: Request, res: Response): Promise<Response> {
    const listPetsUseCase = inversifyContainer.get(ListPetsUseCase);

    const pets = await listPetsUseCase.execute();

    return res.status(200).json(pets);
  }
}
